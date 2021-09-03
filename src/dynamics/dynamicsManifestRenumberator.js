/**
 * @module "DynamicsManifestRenumberator" class
 * @description Handles Dynamics app manifest renumberation
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import FileSystem from "fs";
import Path from "path";
import Renumberator from "../engine/renumberator.js";

export default class DynamicsManifestRenumberator extends Renumberator {
    get name() { return "Dynamics AL Manifest Renumberator"; }
    get dynamicsManager() { return this.engine.dynamicsManager; }
    get dynamicsApp() { return this.engine.dynamicsApp; }

    constructor(pRenumberation) {
        super(pRenumberation);
    }

    canRenumber(pFilePath) {
        return Path.basename(pFilePath).trim().toLowerCase() === "app.json";
    }

    async renumber(pFilePath) {
        this.initialise(pFilePath);
        this.createNewFile();
        await this.renumberDynamicsApp();
        await this.renumberFile();
        //^^^
        // this.overwriteFileWithNewFile();
    }

    initialise(pFilePath) {
        this.filePath = pFilePath;
    }
    
    async renumberDynamicsApp() {
        this.existingDynamicsApp = this.dynamicsManager.getApp(this.dynamicsApp.id);
        if (this.existingDynamicsApp != null)
            this.dynamicsApp.renumberedId = this.existingDynamicsApp.renumberedId;
        else
            this.dynamicsApp.renumberedId = await this.dynamicsManager.createNewAppId();
    }

    async renumberFile() {
        let rawData = FileSystem.readFileSync(this.filePath);
        let data = JSON.parse(rawData);
        this.dynamicsApp.inject(data);
        rawData = JSON.stringify(data, null, 4);
        this.newFile.write(rawData);
    }    
}
