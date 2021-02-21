/**
 * @module "DynamicsPermissionSetRenumberator" class
 * @description Handles renumberation of Dynamics permission set
 * @version 0.0.1 (2021-02-21)
 */

const fs = require("fs");
const path = require("path");
const xmldoc = require("xmldoc");
__require("general/javaScript");
const RenumberationHandler = __require("renumberation/renumberatotionHandler");

class DynamicsPermissionSetRenumberator extends RenumberationHandler {
    get name() { return "Dynamics AL Permission Set Renumberator"; }

    constructor() {
        super();
    }
    
    canRenumber(pFilePath) {
        let result = false;
        if (path.extname(pFilePath).trim().toLowerCase() === ".xml") {
            const xmlFile = fs.readFileSync(pFilePath);
            const xmlDoc = new xmldoc.XmlDocument(xmlFile);
            result = (xmlDoc.name === "PermissionSets");
        };
        return result;
    }

    renumber(pFilePath) {
        
    }
}

module.exports = DynamicsPermissionSetRenumberator;