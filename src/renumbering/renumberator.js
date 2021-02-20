/**
 * @module "Renumberator" class
 * @description Performs renumberation of Dynamics objects
 * @version 0.0.1 (2021-02-18)
 */

const fs = require("fs");
const path = require("path");

include("/general/javaScript");

const DynamicsApp = include("/dynamics/dynamicsApp");

class Renumberator {
    get folderPath() { return this.mFolderPath; }
    get onDynamicsApp() { return this.mOnDynamicsApp; }
    get dynamicsApp() { return this.mDynamicsApp; }
    set dynamicsApp(pValue) { this.mDynamicsApp = pValue; }

    constructor(pFolderPath, pOnDynamicsApplication) {
        this.mFolderPath = String.default(pFolderPath);
        this.mOnDynamicsApp = pOnDynamicsApplication;
        this.mDynamicsApp = null;
    }

    run() {
        this.validate();
        this.readDynamicsApp();
        this.initialiseRenumberationHandlers();
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
            if (this.onDynamicsApp != null)
                this.onDynamicsApp(this.dynamicsApp);
        } else
            throw new Error("Dynamics application manifest (app.json) is missing.");
    }

    initialiseRenumberationHandlers() {
        //TODO = Not implemented
    }

    renumber() {
        //TODO = Not implemented
    }
}

module.exports = Renumberator;