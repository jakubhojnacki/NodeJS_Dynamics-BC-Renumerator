/**
 * @module "DynamicsPermissionSetRenumberator" class
 * @description Handles renumberation of Dynamics permission set
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import Path from "path";
import Renumberator from "../engine/renumberator.js";
import XmlToolkit from "../xml/xmlToolkit.js";

export default class DynamicsPermissionSetRenumberator extends Renumberator {
    get debug() { return global.theApplication.debug; }

    get code() { return "Permission Set"; }
    get name() { return "Dynamics AL Permission Set Renumberator"; }

    constructor(pRenumberation) {
        super(pRenumberation);
    }
    
    async canRenumber(pFilePath) {
        let result = false;
        if (Path.extname(pFilePath).trim().toLowerCase() === ".xml") {
            const xmlDocument = await XmlToolkit.readFile(pFilePath);
            result = (xmlDocument.PermissionSets != null);
        };
        return result;
    }

    async renumber(pFilePath) {
        const xmlDocument = await XmlToolkit.readFile(pFilePath);
        this.debug.dumpJson("Permission Set", xmlDocument);
    }
}
