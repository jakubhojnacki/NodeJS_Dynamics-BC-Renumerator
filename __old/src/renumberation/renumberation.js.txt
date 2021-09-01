/**
 * @module "Renumberation" class
 * @description Performs renumberation of Dynamics objects
 * @version 0.0.1 (2021-02-18)
 */

const fs = require("fs");
const path = require("path");

require("../general/javaScript");

const DynamicsApp = require("../dynamics/dynamicsApp");
const DynamicsManager = require("../dynamics/dynamicsManager");
const EndOfLineType = require("../general/endOfLineType");
const RenumberatorFactory = require("./renumberatorFactory");

class Renumberation {
    get tempExtension() { return ".tmp"; }    
    get folderPath() { return this.mFolderPath; }
    get endOfLineType() { return this.mEndOfLineType; }
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

    constructor(pFolderPath, pEndOfLineType) {
        this.mFolderPath = String.default(pFolderPath);
        this.mEndOfLineType = EndOfLineType.parse(String.default(pEndOfLineType));
        this.mDynamicsManager = new DynamicsManager();
        this.mDynamicsApp = null;
        this.mDynamicsObjects = null;
        this.mRenumberators = [];
    }

    async run() {
        this.validate();
        this.readDynamicsApp();
        await this.dynamicsManager.readApps();
        await this.dynamicsManager.readObjects();
        this.renumberators = RenumberatorFactory.create(this);
        await this.renumber();
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

    async renumber() {
        await this.renumberFolder(this.folderPath, 0);
    }

    async renumberFolder(pFolderPath, pIndentation) {
        const folderName = pIndentation > 0 ? path.basename(pFolderPath) : "/";
        if (this.onFolder)
            this.onFolder(folderName, pIndentation);
        const folderEntries = fs.readdirSync(pFolderPath, { withFileTypes: true });
        for (const folderEntry of folderEntries) {
            const folderEntryPath = path.join(pFolderPath, folderEntry.name);
            if (folderEntry.isDirectory())
                await this.renumberFolder(folderEntryPath, pIndentation + 1);
            else 
                if (folderEntry.isFile())
                    await this.renumberFile(folderEntryPath, pIndentation + 1); 
        };
    }	   
    
    async renumberFile(pFilePath, pIndentation) {
        if (path.extname(pFilePath).trim().toLowerCase() !== this.tempExtension) {
            let renumbered = false;
            const renumberator = this.renumberators.find((lRenumberator) => { return lRenumberator.canRenumber(pFilePath); });
            if (renumberator) {
                await renumberator.renumber(pFilePath);
                renumbered = true;
            }
            const fileName = path.basename(pFilePath);
            if (this.onFile)
                this.onFile(fileName, renumbered, renumberator, pIndentation);
        }
    }
}

module.exports = Renumberation;