/**
 * @module "DynamicsManifestRenumberator" class
 * @description Handles Dynamics app manifest renumberation
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import FileSystem from "fs";
import Path from "path";
import Renumberator from "../engine/renumberator.js";
import DynamicsManifestSerialiser from "./dynamicsManifestSerialiser.js";

export default class DynamicsManifestRenumberator extends Renumberator {
    get code() { return "Manifest"; }
    get name() { return "Dynamics AL Manifest Renumberator"; }

    get dynamicsApplication() { return this.engine.dynamicsApplication; }
    get data() { return this.mData; }
    set data(pValue) { this.mData = pValue; }

    constructor(pEngine) {
        super(pEngine);
        this.mData = null;
    }

    canRenumber(pFilePath) {
        return Path.basename(pFilePath).trim().toLowerCase() === "app.json";
    }

    renumber(pFilePath) {
        this.initialise(pFilePath);
        this.readData();
        this.renumberData();
        this.writeData();
    }

    initialise(pFilePath) {
        this.filePath = pFilePath;
    }
    
    readData() {
        let rawData = FileSystem.readFileSync(this.filePath);
        this.data = JSON.parse(rawData);
    }

    renumberData() {
        DynamicsManifestSerialiser.serialiseDynamicsApplication(this.dynamicsApplication, this.data);
    }

    async writeData() {
        this.createNewFile();
        const rawData = JSON.stringify(this.data, null, 4);
        this.newFile.write(rawData);
        this.overwriteFileWithNewFile();
    }    
}
