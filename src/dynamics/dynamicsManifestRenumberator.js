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
    get name() { return "Manifest Renumberator"; }
    get dynamicsApplication() { return this.engine.dynamicsApplication; }

    constructor(pEngine) {
        super(pEngine);
        this.mData = null;
    }

    async canRenumber(pFilePath) {
        return Path.basename(pFilePath).trim().toLowerCase() === "app.json";
    }

    async renumber(pFilePath) {
        this.initialise(pFilePath, true);
        await this.process();
        this.finalise();
    }

    async process() {
        const rawData = FileSystem.readFileSync(this.filePath);
        const data = JSON.parse(rawData);
        DynamicsManifestSerialiser.applyDynamicsApplication(this.dynamicsApplication, data);
        const renumberedRawData = JSON.stringify(data, null, 4);
        this.temporaryFile.write(renumberedRawData);
    }
}
