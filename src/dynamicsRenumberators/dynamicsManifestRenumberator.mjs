/**
 * @module "DynamicsManifestRenumberator" class
 * @description Handles Dynamics app manifest renumberation
 * @version 0.0.1 (2021-02-21)
 */

import FileSystem from "fs";
import Path from "path";

import { DynamicsManifestAdapter } from "../dynamicsTools/dynamicsManifestAdapter.mjs";
import { Renumberator } from "../logic/renumberator.mjs";

export class DynamicsManifestRenumberator extends Renumberator {
    get name() { return "Manifest Renumberator"; }
    get dynamicsApplication() { return this.logic.dynamicsApplication; }

    constructor(pLogic) {
        super(pLogic);
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
        DynamicsManifestAdapter.applyDynamicsApplication(this.dynamicsApplication, data);
        const renumberedRawData = JSON.stringify(data, null, 4);
        this.fileBuffer.write(renumberedRawData);
    }
}
