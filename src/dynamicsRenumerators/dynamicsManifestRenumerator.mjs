/**
 * @module "DynamicsManifestRenumerator" class
 * @description Handles Dynamics app manifest renumeration
 * @version 0.0.1 (2021-02-21)
 */

"use strict";

import FileSystem from "fs";
import Path from "path";

import { DynamicsManifestAdapter } from "fortah-dynamics-library";
import { Renumerator } from "../logic/renumerator.mjs";

export class DynamicsManifestRenumerator extends Renumerator {
    get name() { return "Manifest Renumerator"; }
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
        const renumberedDynamicsApplication = this.dynamicsApplication.renumber();
        const dynamicsManifestAdapter = new DynamicsManifestAdapter();
        dynamicsManifestAdapter.applyDynamicsApplicationToData(renumberedDynamicsApplication, data);
        const renumberedRawData = JSON.stringify(data, null, 4);
        this.fileBuffer.write(renumberedRawData);
    }
}
