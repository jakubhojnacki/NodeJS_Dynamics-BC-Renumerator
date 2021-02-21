/**
 * @module "DynamicsAlRenumberationHandler" class
 * @description Handles Dynamics AL renumberation
 * @version 0.0.1 (2021-02-21)
 */

const path = require("path");

__require("/general/javaScript");

const RenumberationHandler = __require("/renumberation/renumberatotionHandler");

class DynamicsAlRenumberationHandler extends RenumberationHandler {
    constructor() {
        super()
    }

    canHandle(pFileName) {
        return path.extname(pFileName).trim().toLowerCase() === ".al";
    }

    handle(pFilePath) {
        
    }
}

module.exports = DynamicsAlRenumberationHandler;