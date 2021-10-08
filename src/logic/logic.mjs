/**
 * @module "Logic" class
 * @description Represents application logic
 */

import FileSystem from "fs";
import Path from "path";

import { ConsoleProgress } from "console-library";
import { DynamicsManifestAdapter } from "../dynamicsTools/dynamicsManifestAdapter.mjs";
import { DynamicsRanges } from "../dynamics/dynamicsRanges.mjs";
import { DynamicsWebServiceAdapter } from "../dynamicsTools/dynamicsWebServiceAdapter.mjs";
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

    get dynamicsWebServiceAdapter() { return this.mDynamicsWebServiceAdapter; }
    set dynamicsWebServiceAdapter(pValue) { this.mDynamicsWebServiceAdapter = pValue; }
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
        this.dynamicsWebServiceAdapter = new DynamicsWebServiceAdapter();
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
        this.initialise();
        await this.process();
        this.finalise();
    }

    initialise() {
        if (!this.directoryPath)
            throw new Error("Directory can't be empty.");
        if (!FileSystem.existsSync(this.directoryPath))
            throw new Error(`Directory ${this.directoryPath} doesn't exist.`);

        if (this.settings.ignore.directories)
            for (const ignoreDirectory of this.settings.ignore.directories)
                this.directoryMatchers.push(new FileSystemMatcher(ignoreDirectory));
        if (this.settings.ignore.files)
            for (const ignoreFile of this.settings.ignore.files)
                this.fileMatchers.push(new FileSystemMatcher(ignoreFile));

        const __this = this;
        this.progress = new ConsoleProgress(null, null, (lProgress) => {
            if (__this.onProgress)
                __this.onProgress(lProgress);
        })
    }

    async process() {
        this.readDynamicsApplication();
        await this.callRenumberWebService();
        this.processRenumberWebServiceResponse();
        await this.renumber();
    }

    readDynamicsApplication() {        
        this.progress.reset(1, "Reading Dynamics Application...");
        const filePath = Path.join(this.directoryPath, "app.json");
        if (FileSystem.existsSync(filePath)) {
            const rawData = FileSystem.readFileSync(filePath);
            const data = JSON.parse(rawData);
            this.dynamicsApplication = DynamicsManifestAdapter.deserialiseDynamicsApplication(data);
            this.triggerOnDynamicsApplication();
        } else
            throw new Error("Dynamics application manifest (app.json) is missing.");
        this.validateDynamicsApplication();
        this.progress.complete("Done");
    }

    validateDynamicsApplication() {
        const validator = new Validator();
        validator.testNotEmpty(Logic.name, "Dynamics Application", this.dynamicsApplication);
        if (this.dynamicsApplication)
            this.dynamicsApplication.validate(validator, true);
    }

    async callRenumberWebService() {
        this.progress.reset(1, "Calling Web Service...");
        const renumberationCode = this.settings.general.renumberationCode;
        this.dynamicsWebServiceAdapter.initialise(this.dynamicsApplication, renumberationCode);
        this.dynamicsWebServiceAdapter.validate(null, true);
        await this.dynamicsWebServiceAdapter.renumber(this.dynamicsApplication, this.settings.general.renumberationCode);
        this.dynamicsWebServiceAdapter.finalise();
        this.progress.complete("Done");
    }

    processRenumberWebServiceResponse() {
        this.progress.reset(1, "Processing Web Service Response...");
        const webServiceDynamicsApplication = this.dynamicsWebServiceAdapter.dynamicsApplication;
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
        this.dynamicsObjects = this.dynamicsWebServiceAdapter.dynamicsObjects;
        this.debug.dumpJson("Objects", this.dynamicsObjects.serialise());
        this.progress.complete("Done");
    }

    async renumber() {
        const count = this.countDirectory(this.directoryPath, 0, 0);
        this.progress.reset(count, "Renumbering...");
        this.renumberators = RenumberatorFactory.create(this);
        await this.renumberDirectory(this.directoryPath, 0);
        this.progress.complete("Completed");
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