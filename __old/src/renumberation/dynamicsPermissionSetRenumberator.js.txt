/**
 * @module "DynamicsPermissionSetRenumberator" class
 * @description Handles renumberation of Dynamics permission set
 * @version 0.0.1 (2021-02-21)
 */

const fs = require("fs");
const path = require("path");
const xmldoc = require("xmldoc");

require("../general/javaScript");

const Renumberator = require("./renumberator");

class DynamicsPermissionSetRenumberator extends Renumberator {
    get name() { return "Dynamics AL Permission Set Renumberator"; }

    constructor(pRenumberation) {
        super(pRenumberation);
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
        //TODO - Not implemented
    }
}

module.exports = DynamicsPermissionSetRenumberator;