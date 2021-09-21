/**
 * @module "Engine" class
 * @description Represents application engine
 * @version 0.0.1 (2021-08-10)
 */

import "../general/javaScript.js";
import DirectoryEventInfo from "./directoryEventInfo.js";
import DynamicsApplicationEventInfo from "./dynamicsApplicationEventInfo.js";
import DynamicsManifestSerialiser from "../dynamics/dynamicsManifestSerialiser.js";
import DynamicsWebServiceAdapter from "../dynamics/dynamicsWebServiceAdapter.js";
import FileEventInfo from "./fileEventInfo.js";
import FileSystem from "fs";
import FileSystemMatcher from "../general/fileSystemMatcher.js";
import Path from "path";
import Progress from "../general/progress.js";
import RenumberatorFactory from "./renumberatorFactory.js";
import Validator from "../general/validator.js";

export default class Engine {
    get directoryPath() { return this.mDirectoryPath; }
    get settings() { return this.mSettings; }

    get dynamicsWebServiceAdapter() { return this.mDynamicsWebServiceAdapter; }
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

    get onProgress() { return this.mOnProgress; }
    set onProgress(pValue) { this.mOnProgress = pValue; }
    get onDynamicsApplication() { return this.mOnDynamicsApplication; }
    set onDynamicsApplication(pValue) { this.mOnDynamicsApplication = pValue; }
    get onDirectory() { return this.mOnDirectory; }
    set onDirectory(pValue) { this.mOnDirectory = pValue; }
    get onFile() { return this.mOnFile; }
    set onFile(pValue) { this.mOnFile = pValue; }

    constructor(pDirectoryPath, pSettings) {
        this.mDirectoryPath = String.validate(pDirectoryPath);
        this.mSettings = pSettings;
        this.mDynamicsWebServiceAdapter = new DynamicsWebServiceAdapter();
        this.mDynamicsApplication = null;
        this.mDynamicsObjects = [];
        this.mRenumberators = [];
        this.mDirectoryMatchers = [];
        this.mFileMatchers = [];
        this.mProgress = new Progress();
        this.mOnProgress = null;
        this.mOnDynamicsApplication = null;
        this.mOnDirectory = null;
        this.mOnFile = null;
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
    }

    async process() {
        this.readDynamicsApplication();
        await this.callRenumberWebService();
        this.processRenumberWebServiceResponse();
        this.count();
        await this.renumber();
        this.triggerOnProgress(null, "Completed");
    }

    readDynamicsApplication() {        
        const filePath = Path.join(this.directoryPath, "app.json");
        if (FileSystem.existsSync(filePath)) {
            const rawData = FileSystem.readFileSync(filePath);
            const data = JSON.parse(rawData);
            this.dynamicsApplication = DynamicsManifestSerialiser.deserialiseDynamicsApplication(data);
            this.triggerOnDynamicsApplication();
        } else
            throw new Error("Dynamics application manifest (app.json) is missing.");
        this.validateDynamicsApplication();
    }

    validateDynamicsApplication() {
        const validator = new Validator();
        validator.testNotEmpty(Engine.name, "Dynamics Application", this.dynamicsApplication);
        if (this.dynamicsApplication)
            this.dynamicsApplication.validate(validator, true);
    }

    async callRenumberWebService() {
        const renumberationCode = this.settings.general.renumberationCode;
        this.dynamicsWebServiceAdapter.initialise(this.dynamicsApplication, renumberationCode);
        this.dynamicsWebServiceAdapter.validate(null, true);
        await this.dynamicsWebServiceAdapter.renumber();
        this.dynamicsWebServiceAdapter.finalise();
    }

    processRenumberWebServiceResponse() {
        const webServiceDynamicsApplication = this.dynamicsWebServiceAdapter.dynamicsApplication;
        this.dynamicsApplication.renumberedId = webServiceDynamicsApplication.renumberedId;
        if (webServiceDynamicsApplication.dependencies)
            for (const dynamicsDependency of this.dynamicsApplication.dependencies) {
                const webServiceDynamicsDependency = webServiceDynamicsApplication.dependencies.get(dynamicsDependency.id);
                if (webServiceDynamicsDependency)
                    dynamicsDependency.renumberedId = webServiceDynamicsDependency.renumberedId;
            }
        if (webServiceDynamicsApplication.idRanges) 
            for (const dynamicsIdRange of this.dynamicsApplication.idRanges) {
                const webServiceDynamicsIdRange = webServiceDynamicsApplication.idRanges.get(dynamicsIdRange.from, dynamicsIdRange.to);
                if (webServiceDynamicsIdRange) {
                    dynamicsIdRange.renumberedFrom = webServiceDynamicsIdRange.renumberedFrom;
                    dynamicsIdRange.renumberedTo = webServiceDynamicsIdRange.renumberedTo;
                }
            }
        this.dynamicsObjects = this.dynamicsWebServiceAdapter.dynamicsObjects;
    }

    count() {
        const count = this.countDirectory(this.directoryPath, 0, 0);
        this.progress.count = count;
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

    async renumber() {
        this.renumberators = RenumberatorFactory.create(this);
        await this.renumberDirectory(this.directoryPath, 0);
    }

    async renumberDirectory(pDirectoryPath, pIndentation) {
        const directoryName = pIndentation > 0 ? Path.basename(pDirectoryPath) : "/";
        const shouldBeRenumbered = pIndentation > 0 ? this.shouldDirectoryBeRenumbered(directoryName) : true;
        if (shouldBeRenumbered) {
            this.triggerOnProgress(0, pDirectoryPath);
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
                this.triggerOnProgress(1, pFilePath);
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

    triggerOnProgress(pDelta, pMessage) {
        if (pDelta == null)
            this.progress.complete(pMessage);
        else
            this.progress.move(pDelta, pMessage);
        if (this.onProgress)
            this.onProgress(this.progress);
    }

    triggerOnDynamicsApplication() {
        if (this.onDynamicsApplication)
            this.onDynamicsApplication(new DynamicsApplicationEventInfo(this.dynamicsApplication, 0));
    }

    triggerOnDirectory(pDirectoryPath, pDirectoryName, pIndentation) {
        if (this.onDirectory)
            this.onDirectory(new DirectoryEventInfo(pDirectoryPath, pDirectoryName, pIndentation));
    }

    triggerOnFile(pFilePath, pFileName, pRenumbered, pRenumberator, pIndentation) {
        if (this.onFile)
            this.onFile(new FileEventInfo(pFilePath, pFileName, pRenumbered, pRenumberator, pIndentation));
    }

    finalise() {        
    }
}