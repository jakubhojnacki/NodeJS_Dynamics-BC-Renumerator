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

export default class Engine {
    get directoryPath() { return this.mDirectoryPath; }
    get settings() { return this.mSettings; }

    get dynamicsWebServiceAdapter() { return this.mDynamicsWebServiceAdapter; }
    get dynamicsApp() { return this.mDynamicsApp; }
    set dynamicsApp(pValue) { this.mDynamicsApp = pValue; }
    get renumberators() { return this.mRenumberators; }
    set renumberators(pValue) { this.mRenumberators = pValue; }

    get onDynamicsApp() { return this.mOnDynamicsApp; }
    set onDynamicsApp(pValue) { this.mOnDynamicsApp = pValue; }
    get onDirectory() { return this.mOnDirectory; }
    set onDirectory(pValue) { this.mOnDirectory = pValue; }
    get onFile() { return this.mOnFile; }
    set onFile(pValue) { this.mOnFile = pValue; }

    constructor(pDirectoryPath, pSettings) {
        this.mDirectoryPath = String.validate(pDirectoryPath);
        this.mSettings = pSettings;
        this.mDynamicsWebServiceAdapter = new DynamicsWebServiceAdapter(this.settings.dynamicsWebService);
        this.mDynamicsApp = null;
        this.mRenumberators = [];
        this.mOnDynamicsApp = null;
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
    }

    async process() {
        this.readDynamicsApp();
        await this.dynamicsWebServiceAdapter.renumber();
        this.renumberators = RenumberatorFactory.create(this);
        await this.renumber();
    }

    readDynamicsApp() {
        const filePath = Path.join(this.directoryPath, "app.json");
        if (FileSystem.existsSync(filePath)) {
            const rawData = FileSystem.readFileSync(filePath);
            const data = JSON.parse(rawData);
            this.dynamicsApp = DynamicsManifestSerialiser.deserialiseDynamicsApplication(data);
            if (this.onDynamicsApp)
                this.onDynamicsApp(this.dynamicsApp);
        } else
            throw new Error("Dynamics application manifest (app.json) is missing.");
    }

    async renumber() {
        await this.renumberDirectory(this.directoryPath, 0);
    }

    async renumberDirectory(pDirectoryPath, pIndentation) {
        const directoryName = pIndentation > 0 ? Path.basename(pDirectoryPath) : "/";
        if (this.shouldDirectoryBeRenumbered(directoryName)) {
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
        let result = false;
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
        let result = false;
        return result;
    }

    finalise() {        
    }
}