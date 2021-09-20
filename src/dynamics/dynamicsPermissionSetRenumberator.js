/**
 * @module "DynamicsPermissionSetRenumberator" class
 * @description Handles renumberation of Dynamics permission set
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import FileSystem from "fs";
import Path from "path";
import XmlDoc from "xmldoc";
import Renumberator from "../engine/renumberator.js";

export default class DynamicsPermissionSetRenumberator extends Renumberator {
    get code() { return "Permission Set"; }
    get name() { return "Dynamics AL Permission Set Renumberator"; }

    constructor(pRenumberation) {
        super(pRenumberation);
    }
    
    canRenumber(pFilePath) {
        let result = false;
        if (Path.extname(pFilePath).trim().toLowerCase() === ".xml") {
            const xmlFile = FileSystem.readFileSync(pFilePath);
            const xmlDoc = new XmlDoc.XmlDocument(xmlFile);
            result = (xmlDoc.name === "PermissionSets");
        };
        return result;
    }

    renumber(pFilePath) {
        //TODO - Not implemented
    }
}
