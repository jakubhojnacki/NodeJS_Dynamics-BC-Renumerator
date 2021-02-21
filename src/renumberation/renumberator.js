/**
 * @module "Renumberator" class
 * @description Performs renumberation of Dynamics objects
 * @version 0.0.1 (2021-02-18)
 */

const fs = require("fs");
const path = require("path");

__require("/general/javaScript");

const DynamicsApp = __require("/dynamics/dynamicsApp");
const RenumberationHandlerFactory = __require("/renumberation/renumberationHandlerFactory");

class Renumberator {
    get folderPath() { return this.mFolderPath; }
    get dynamicsApp() { return this.mDynamicsApp; }
    set dynamicsApp(pValue) { this.mDynamicsApp = pValue; }
    get handlers() { return this.mHandlers; }
    set handlers(pValue) { this.mHandlers = pValue; }

    get onDynamicsApp() { return this.mOnDynamicsApp; }
    set onDynamicsApp(pValue) { this.mOnDynamicsApp = pValue; }
    get onFolder() { return this.mOnFolder; }
    set onFolder(pValue) { this.mOnFolder = pValue; }
    get onFile() { return this.mOnFile; }
    set onFile(pValue) { this.mOnFile = pValue; }

    constructor(pFolderPath) {
        this.mFolderPath = String.default(pFolderPath);
        this.mDynamicsApp = null;
        this.mHandlers = [];
    }

    run() {
        this.validate();
        this.readDynamicsApp();
        this.createHandlers();
        this.renumber();
    }

    validate() {
        if (!this.folderPath)
            throw new Error("Folder path can't be empty.");
        if (!fs.existsSync(this.folderPath))
            throw new Error(`Folder ${this.folderPath} doesn't exist.`);
    }

    readDynamicsApp() {
        const filePath = path.join(this.folderPath, "app.json");
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath);
            const data = JSON.parse(rawData);
            this.dynamicsApp = DynamicsApp.deserialise(data);
            if (this.onDynamicsApp)
                this.onDynamicsApp(this.dynamicsApp);
        } else
            throw new Error("Dynamics application manifest (app.json) is missing.");
    }

    createHandlers() {
        this.handlers = RenumberationHandlerFactory.create();
    }

    renumber() {
        this.renumberFolder(this.folderPath, 0);
    }

    renumberFolder(pFolderPath, pIndentation) {
        const folderName = pIndentation > 0 ? path.basename(pFolderPath) : "/";
        if (this.onFolder)
            this.onFolder(folderName, pIndentation);
        const folderEntries = fs.readdirSync(pFolderPath, { withFileTypes: true });
        for (const folderEntry of folderEntries) {
            const folderEntryPath = path.join(pFolderPath, folderEntry.name);
            if (folderEntry.isDirectory())
                this.renumberFolder(folderEntryPath, pIndentation + 1);
            else 
                if (folderEntry.isFile())
                    this.renumberFile(folderEntryPath, pIndentation + 1); 
        };
    }	   
    
    renumberFile(pFilePath, pIndentation) {
        const fileName = path.basename(pFilePath);
        if (this.onFile)
            this.onFile(fileName, pIndentation);
        //TODO - Not implemented
    }
}

module.exports = Renumberator;