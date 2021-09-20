/**
 * @module "Engine" class
 * @description Represents application engine
 * @version 0.0.1 (2021-08-10)
 */

import "../general/javaScript.js";
import DynamicsManifestSerialiser from "../dynamics/dynamicsManifestSerialiser.js";
import DynamicsWebServiceAdapter from "../dynamics/dynamicsWebServiceAdapter.js";
import FileSystem from "fs";
import Path from "path";
import RenumberatorFactory from "./renumberatorFactory.js";
import Validator from "../general/validator.js";
import FileSystemMatcher from "../general/fileSystemMatcher.js";

export default class Engine {
    get directoryPath() { return this.mDirectoryPath; }
    get settings() { return this.mSettings; }

    get dynamicsWebServiceAdapter() { return this.mDynamicsWebServiceAdapter; }
    get dynamicsApplication() { return this.mDynamicsApplication; }
    set dynamicsApplication(pValue) { this.mDynamicsApplication = pValue; }
    
    get renumberators() { return this.mRenumberators; }
    set renumberators(pValue) { this.mRenumberators = pValue; }
    get directoryMatchers() { return this.mDirectoryMatchers; }
    set directoryMatchers(pValue) { this.mDirectoryMatchers = pValue; }
    get fileMatchers() { return this.mFileMatchers; }
    set fileMatchers(pValue) { this.mFileMatchers = pValue; }

    get onDynamicsApplication() { return this.mOnDynamicsApplication; }
    set onDynamicsApplication(pValue) { this.mOnDynamicsApplication = pValue; }
    get onDirectory() { return this.mOnDirectory; }
    set onDirectory(pValue) { this.mOnDirectory = pValue; }
    get onFile() { return this.mOnFile; }
    set onFile(pValue) { this.mOnFile = pValue; }

    constructor(pDirectoryPath, pSettings) {
        this.mDirectoryPath = String.validate(pDirectoryPath);
        this.mSettings = pSettings;
        this.mDynamicsWebServiceAdapter = new DynamicsWebServiceAdapter(this.settings.dynamicsWebService);
        this.mDynamicsApplication = null;
        this.mRenumberators = [];
        this.mDirectoryMatchers = [];
        this.mFileMatchers = [];
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
        await this.callWebService();
        await this.renumber();
    }

    readDynamicsApplication() {
        const filePath = Path.join(this.directoryPath, "app.json");
        if (FileSystem.existsSync(filePath)) {
            const rawData = FileSystem.readFileSync(filePath);
            const data = JSON.parse(rawData);
            this.dynamicsApplication = DynamicsManifestSerialiser.deserialiseDynamicsApplication(data);
            if (this.onDynamicsApplication)
                this.onDynamicsApplication(this.dynamicsApplication);
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

    async callWebService() {
        const renumberationCode = this.settings.general.renumberationCode;
        this.dynamicsWebServiceAdapter.initialise(this.dynamicsApplication, renumberationCode);
        this.dynamicsWebServiceAdapter.validate(null, true);
        await this.dynamicsWebServiceAdapter.renumber();
        this.dynamicsWebServiceAdapter.finalise();
    }

    async renumber() {
        this.renumberators = RenumberatorFactory.create(this);
        await this.renumberDirectory(this.directoryPath, 0);
    }

    async renumberDirectory(pDirectoryPath, pIndentation) {
        const directoryName = pIndentation > 0 ? Path.basename(pDirectoryPath) : "/";
        const shouldBeRenumbered = pIndentation > 0 ? this.shouldDirectoryBeRenumbered(directoryName) : true;
        if (shouldBeRenumbered) {
            if (this.onDirectory)
                this.onDirectory(directoryName, pIndentation);
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
                let renumbered = false;
                const renumberator = this.renumberators.find((lRenumberator) => { return lRenumberator.canRenumber(pFilePath); });
                if (renumberator) {
                    await renumberator.renumber(pFilePath);
                    renumbered = true;
                }
                if (this.onFile)
                    this.onFile(fileName, renumbered, renumberator, pIndentation);
            }
        }
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

    finalise() {        
    }
}