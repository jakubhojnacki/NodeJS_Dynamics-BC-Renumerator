/**
 * @module "DynamicsPermissionSetRenumberationHandler" class
 * @description Handles renumberation of Dynamics permission set
 * @version 0.0.1 (2021-02-21)
 */

 const path = require("path");

__require("/general/javaScript");

const RenumberationHandler = __require("/renumberation/renumberatotionHandler");

class DynamicsPermissionSetRenumberationHandler extends RenumberationHandler {
    constructor() {
        super()
    }
    
    canHandle(pFileName) {
        let result = false;
        if (path.extname(pFileName).trim().toLowerCase() === ".xml") {

        };
        return result;
    }

    handle(pFilePath) {
        
    }
}

module.exports = DynamicsPermissionSetRenumberationHandler;