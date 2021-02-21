/**
 * @module "DynamicsAlRenumberator" class
 * @description Handles Dynamics AL renumberation
 * @version 0.0.1 (2021-02-21)
 */

const path = require("path");
__require("general/javaScript");
const RenumberationHandler = __require("renumberation/renumberatotionHandler");

class DynamicsAlRenumberator extends RenumberationHandler {
    get name() { return "Dynamics AL Renumberator"; }

    constructor() {
        super();
    }

    canRenumber(pFilePath) {
        return path.extname(pFilePath).trim().toLowerCase() === ".al";
    }

    renumber(pFilePath) {
        
    }
}

module.exports = DynamicsAlRenumberator;