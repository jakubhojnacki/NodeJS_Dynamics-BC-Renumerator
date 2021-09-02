/**
 * @module "DynamicsAppManifestRenumberator" class
 * @description Handles Dynamics app manifest renumberation
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import FileSystem from "fs.js";
import Path from "path.js";
import Renumberator from "./renumberator.js";

export default class DynamicsAppManifestRenumberator extends Renumberator {
    get name() { return "Dynamics AL App Manifest Renumberator"; }
    get dynamicsManager() { return this.renumberation.dynamicsManager; }
    get dynamicsApp() { return this.renumberation.dynamicsApp; }

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
