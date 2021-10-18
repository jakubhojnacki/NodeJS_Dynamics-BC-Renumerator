/**
 * @module "Logic" class
 * @description Represents application logic
 */

import FileSystem from "fs";
import Path from "path";

import { ConsoleProgress } from "console-library";
import { DynamicsManifestAdapter } from "../dynamicsTools/dynamicsManifestAdapter.mjs";
import { DynamicsRanges } from "../dynamics/dynamicsRanges.mjs";
import { DynamicsWebService } from "../dynamicsTools/dynamicsWebService.mjs";
import { FileSystemItem } from "file-system-library";
import { FileSystemItemInfo } from "../logic/fileSystemItemInfo.mjs";
import { FileSystemMatcher } from "file-system-library";
import { RenumberatorFactory } from "../logic/renumberatorFactory.mjs";
import { Validator } from "core-library";

export class Logic {
    get settings() { return global.theApplication.settings; }
    get debug() { return global.theApplication.debug; }

    get application() { return this.mApplication; }
    set application(pValue) { this.mApplication = pValue; }
    get directoryPath() { return this.mDirectoryPath; }
    set directoryPath(pValue) { this.mDirectoryPath = pValue; }

    get dynamicsWebService() { return this.mDynamicsWebService; }
    set dynamicsWebService(pValue) { this.mDynamicsWebService = pValue; }
    get dynamicsApplication() { return this.mDynamicsApplication; }
    set dynamicsApplication(pValue) { this.mDynamicsApplication = pValue; }
    get dynamicsObjects() { return this.mDynamicsObjects; }
    set dynamicsObjects(pValue) { this.mDynamicsObjects = pValue; }
    
    get renumberators() { return this.mRenumberators; }
    set renumberators(pValue) { this.mRenumberators = pValue; }
    get directoryMatchers() { return this.mDirectoryMatchers; }
    set directoryMatchers(pValue) { this.mDirectoryMatchers = pValue; }
    get fileMatchers() { return this.mFileMatchers; }
    set fileMatchers(pValue) { this.mFileMatchers = pValue; }
    get progress() { return this.mProgress; }
    set progress(pValue) { this.mProgress = pValue; }

    get onProgress() { return this.mOnProgress; }
    set onProgress(pValue) { this.mOnProgress = pValue; }
    get onDynamicsApplication() { return this.mOnDynamicsApplication; }
    set onDynamicsApplication(pValue) { this.mOnDynamicsApplication = pValue; }
    get onDirectory() { return this.mOnDirectory; }
    set onDirectory(pValue) { this.mOnDirectory = pValue; }
    get onFile() { return this.mOnFile; }
    set onFile(pValue) { this.mOnFile = pValue; }

    constructor(pApplication, pDirectoryPath) {
        this.application = pApplication;
        this.directoryPath = pDirectoryPath;
        this.dynamicsWebService = new DynamicsWebService(this.application);
        this.dynamicsApplication = null;
        this.dynamicsObjects = [];
        this.renumberators = [];
        this.directoryMatchers = [];
        this.fileMatchers = [];
        this.progress = null;
        this.onProgress = null;
        this.onDynamicsApplication = null;
        this.onDirectory = null;
        this.onFile = null;
    }

    async run() {      
        if (this.initialise()) {
            await this.process();
            this.finalise();
        }
    }

    initialise() {
        let result = false;

        const validator = new Validator(Logic.name);
        validator.testNotEmpty("Directory path", this.directoryPath);
        validator.testNotEmpty("Directory exists", FileSystem.existsSync(this.directoryPath));
        result = !validator.errorMessagesExist;
        if (!result)
            this.application.console.writeMessages(validator.messages);

        if (result) {
            if (this.application.settings.ignore.directories)
                for (const ignoreDirectory of this.application.settings.ignore.directories)
                    this.directoryMatchers.push(new FileSystemMatcher(ignoreDirectory));
            if (this.application.settings.ignore.files)
                for (const ignoreFile of this.application.settings.ignore.files)
                    this.fileMatchers.push(new FileSystemMatcher(ignoreFile));

            const __this = this;
            this.progress = new ConsoleProgress(null, null, (lProgress) => {
                if (__this.onProgress)
                    __this.onProgress(lProgress);
            })
        }

        return result;
    }

    async process() {
        let result = this.readDynamicsApplication();
        if (result)
            result = await this.callRenumberWebService();
        /*TODO - Uncomment
        if (result)
            result = this.processRenumberWebServiceResponse();
        if (result)
            result = await this.renumber();
        */
        return result;
    }

    readDynamicsApplication() {        
        let result = false;
        this.progress.reset(1, "Reading Dynamics Application...");
        const filePath = Path.join(this.directoryPath, "app.json");
        if (FileSystem.existsSync(filePath)) {
            const rawData = FileSystem.readFileSync(filePath);
            const data = JSON.parse(rawData);
            this.dynamicsApplication = DynamicsManifestAdapter.dynamicsApplicationFromData(data);
            this.triggerOnDynamicsApplication();
        } else
            throw new Error("Dynamics application manifest (app.json) is missing.");
        result = this.validateDynamicsApplication();
        this.progress.complete("Done");
        if (!result)
            this.application.console.writeMessages(validator.messages);
        return result;
    }

    validateDynamicsApplication() {
        const validator = new Validator(Logic.name);
        validator.testNotEmpty("Dynamics Application", this.dynamicsApplication);
        if (this.dynamicsApplication)
            this.dynamicsApplication.validate(validator, false);
        return !validator.errorMessagesExist;
    }

    async callRenumberWebService() {
        let result = false;
        this.progress.reset(1, "Calling Web Service...");
        const renumberationCode = this.application.settings.general.renumberationCode;
        const validator = new Validator();        
        if (await this.dynamicsWebService.renumber(this.dynamicsApplication, renumberationCode, validator)) {
            this.dynamicsWebService.finalise();
            this.progress.complete("Done");
            result = true;
        } else
            this.application.console.writeMessages(validator.messages);
        return result;
    }

    processRenumberWebServiceResponse() {
        this.progress.reset(1, "Processing Web Service Response...");
        const webServiceDynamicsApplication = this.dynamicsWebService.dynamicsApplication;
        this.dynamicsApplication.renumberedId = webServiceDynamicsApplication.renumberedId;
        if (webServiceDynamicsApplication.dependencies)
            for (const dynamicsDependency of this.dynamicsApplication.dependencies) {
                const webServiceDynamicsDependency = webServiceDynamicsApplication.dependencies.get(dynamicsDependency.id);
                if (webServiceDynamicsDependency)
                    dynamicsDependency.renumberedId = webServiceDynamicsDependency.renumberedId;
            }
        this.dynamicsApplication.ranges = new DynamicsRanges();
        if (webServiceDynamicsApplication.ranges) 
            for (const range of webServiceDynamicsApplication.ranges)
                this.dynamicsApplication.ranges.push(range);
        this.dynamicsObjects = this.dynamicsWebService.dynamicsObjects;
        this.debug.dumpJson("Objects", this.dynamicsObjects.toData());
        this.progress.complete("Done");
        return true;
    }

    async renumber() {
        const count = this.countDirectory(this.directoryPath, 0, 0);
        this.progress.reset(count, "Renumbering...");
        this.renumberators = RenumberatorFactory.create(this);
        await this.renumberDirectory(this.directoryPath, 0);
        this.progress.complete("Completed");
        return true;
    }

    countDirectory(pDirectoryPath, pIndentation, pCountSoFar) {
        let count = pCountSoFar;
        const directoryName = pIndentation > 0 ? Path.basename(pDirectoryPath) : "/";
        const directoryEntries = FileSystem.readdirSync(pDirectoryPath, { withFileTypes: true });
        const shouldBeRenumbered = pIndentation > 0 ? this.shouldDirectoryBeRenumbered(directoryName) : true;
        if (shouldBeRenumbered)
            for (const directoryEntry of directoryEntries) {
                const directoryEntryPath = Path.join(pDirectoryPath, directoryEntry.name);
                if (directoryEntry.isDirectory())
                    count = this.countDirectory(directoryEntryPath, pIndentation + 1, count);
                else if (directoryEntry.isFile())
                    if (this.shouldFileBeRenumbered(directoryEntry.name))
                        count += 1;
            };
        return count;
    }
    
    async renumberDirectory(pDirectoryPath, pIndentation) {
        const directoryName = pIndentation > 0 ? Path.basename(pDirectoryPath) : "/";
        const shouldBeRenumbered = pIndentation > 0 ? this.shouldDirectoryBeRenumbered(directoryName) : true;
        if (shouldBeRenumbered) {
            this.progress.move(0, pDirectoryPath);
            this.triggerOnDirectory(pDirectoryPath, directoryName, pIndentation);
            const directoryEntries = FileSystem.readdirSync(pDirectoryPath, { withFileTypes: true });
            for (const directoryEntry of directoryEntries) {
                const directoryEntryPath = Path.join(pDirectoryPath, directoryEntry.name);
                if (directoryEntry.isDirectory())
                    await this.renumberDirectory(directoryEntryPath, pIndentation + 1);
                else 
                    if (directoryEntry.isFile())
                        await this.renumberFile(directoryEntryPath, pIndentation + 1); 
            };
        }
    }	   

    shouldDirectoryBeRenumbered(pDirectoryName) {
        let result = true;
        for (const directoryMatcher of this.directoryMatchers)
            if (directoryMatcher.matches(pDirectoryName)) {
                result = false;
                break;
            }
        return result;
    }

    async renumberFile(pFilePath, pIndentation) {
        if (Path.extname(pFilePath).trim().toLowerCase() !== this.tempExtension) {
            const fileName = Path.basename(pFilePath);
            if (this.shouldFileBeRenumbered(fileName)) {
                this.progress.move(1, fileName);
                let renumbered = false;
                const renumberator = await this.findRenumberator(pFilePath);
                if (renumberator) {
                    await renumberator.renumber(pFilePath);
                    renumbered = true;
                }
                this.triggerOnFile(pFilePath, fileName, renumbered, renumberator, pIndentation);
            }
        }
    }

    async findRenumberator(pFilePath) {
        let renumberatorFound = null;
        for (const renumberator of this.renumberators)
            if (await renumberator.canRenumber(pFilePath)) {
                renumberatorFound = renumberator;
                break;
            }
        return renumberatorFound;
    }

    shouldFileBeRenumbered(pFileName) {
        let result = true;
        for (const fileMatcher of this.fileMatchers)
            if (fileMatcher.matches(pFileName)) {
                result = false;
                break;
            }
        return result;
    }

    triggerOnDynamicsApplication() {
        if (this.onDynamicsApplication)
            this.onDynamicsApplication(this.dynamicsApplication);
    }

    triggerOnDirectory(pDirectoryPath, pDirectoryName, pIndentation) {
        if (this.onDirectory)
            this.onDirectory(FileSystemItem.newDirectory(pDirectoryPath, pDirectoryName, pIndentation));
    }

    triggerOnFile(pFilePath, pFileName, pRenumbered, pRenumberator, pIndentation) {
        if (this.onFile)
            this.onFile(new FileSystemItemInfo(pFilePath, pFileName, pRenumbered, pRenumberator, pIndentation));
    }

    finalise() {        
    }
}