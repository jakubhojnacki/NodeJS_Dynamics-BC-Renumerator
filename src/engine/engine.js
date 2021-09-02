/**
 * @module "Engine" class
 * @description Represents application engine
 * @version 0.0.1 (2021-08-10)
 */

import "../general/javaScript.js";
import FileSystem from "fs";
import Path from "path";
import RenumberatorFactory from "./renumberatorFactory.js";
import Settings from "../settings/settings.js";

export default class Engine {
    get folderPath() { return this.mFolderPath; }
    get settings() { return this.mSettings; }

    get dynamicsManager() { return this.mDynamicsManager; }
    get dynamicsApp() { return this.mDynamicsApp; }
    set dynamicsApp(pValue) { this.mDynamicsApp = pValue; }
    get dynamicsObjects() { return this.mDynamicsObjects; }
    set dynamicsObjects(pValue) { this.mDynamicsObjects = pValue; }
    get renumberators() { return this.mRenumberators; }
    set renumberators(pValue) { this.mRenumberators = pValue; }

    get onDynamicsApp() { return this.mOnDynamicsApp; }
    set onDynamicsApp(pValue) { this.mOnDynamicsApp = pValue; }
    get onFolder() { return this.mOnFolder; }
    set onFolder(pValue) { this.mOnFolder = pValue; }
    get onFile() { return this.mOnFile; }
    set onFile(pValue) { this.mOnFile = pValue; }

    constructor(pFolderPath, pSettings) {
        this.mFolderPath = String.default(pFolderPath);
        this.mSettings = Object.default(pSettings, new Settings());
        this.mDynamicsManager = new DynamicsManager();
        this.mDynamicsApp = null;
        this.mDynamicsObjects = null;
        this.mRenumberators = [];
    }

    async run() {      
        this.initialise();
        await this.process();
        this.finalise();
    }

    initialise() {
        if (!this.folderPath)
            throw new Error("Folder can't be empty.");
        if (!FileSystem.existsSync(this.folderPath))
            throw new Error(`Folder ${this.folderPath} doesn't exist.`);
    }

    async process() {
        this.readDynamicsApp();
        await this.dynamicsManager.readApps();
        await this.dynamicsManager.readObjects();
        this.renumberators = RenumberatorFactory.create(this);
        await this.renumber();
    }

    readDynamicsApp() {
        const filePath = Path.join(this.folderPath, "app.json");
        if (FileSystem.existsSync(filePath)) {
            const rawData = FileSystem.readFileSync(filePath);
            const data = JSON.parse(rawData);
            this.dynamicsApp = DynamicsApp.deserialise(data);
            if (this.onDynamicsApp)
                this.onDynamicsApp(this.dynamicsApp);
        } else
            throw new Error("Dynamics application manifest (app.json) is missing.");
    }

    async renumber() {
        await this.renumberFolder(this.folderPath, 0);
    }

    async renumberFolder(pFolderPath, pIndentation) {
        const folderName = pIndentation > 0 ? Path.basename(pFolderPath) : "/";
        if (this.onFolder)
            this.onFolder(folderName, pIndentation);
        const folderEntries = FileSystem.readdirSync(pFolderPath, { withFileTypes: true });
        for (const folderEntry of folderEntries) {
            const folderEntryPath = Path.join(pFolderPath, folderEntry.name);
            if (folderEntry.isDirectory())
                await this.renumberFolder(folderEntryPath, pIndentation + 1);
            else 
                if (folderEntry.isFile())
                    await this.renumberFile(folderEntryPath, pIndentation + 1); 
        };
    }	   
    
    async renumberFile(pFilePath, pIndentation) {
        if (Path.extname(pFilePath).trim().toLowerCase() !== this.tempExtension) {
            let renumbered = false;
            const renumberator = this.renumberators.find((lRenumberator) => { return lRenumberator.canRenumber(pFilePath); });
            if (renumberator) {
                await renumberator.renumber(pFilePath);
                renumbered = true;
            }
            const fileName = Path.basename(pFilePath);
            if (this.onFile)
                this.onFile(fileName, renumbered, renumberator, pIndentation);
        }
    }

    finalise() {        
    }
}