/**
 * @module "DynamicsAppManifestRenumberator" class
 * @description Handles Dynamics app manifest renumberation
 * @version 0.0.1 (2021-02-21)
 */

const path = require("path");
__require("general/javaScript");
const Renumberator = __require("renumberation/renumberator");

class DynamicsAppManifestRenumberator extends Renumberator {
    get name() { return "Dynamics AL App Manifest Renumberator"; }

    constructor() {
        super();
    }

    canRenumber(pFilePath) {
        return path.basename(pFilePath).trim().toLowerCase() === "app.json";
    }

    renumber(pFilePath) {
        
    }
}

module.exports = DynamicsAppManifestRenumberator;