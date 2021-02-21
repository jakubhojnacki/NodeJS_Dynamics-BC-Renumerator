/**
 * @module "DynamicsAppManifestRenumberationHandler" class
 * @description Handles Dynamics app manifest renumberation
 * @version 0.0.1 (2021-02-21)
 */

__require("/general/javaScript");

const RenumberationHandler = __require("/renumberation/renumberatotionHandler");

class DynamicsAppManifestRenumberationHandler extends RenumberationHandler {
    constructor() {
        super();
    }

    canHandle(pFileName) {
        return pFileName.trim().toLowerCase() === "app.json";
    }

    handle(pFilePath) {
        
    }
}

module.exports = DynamicsAppManifestRenumberationHandler;