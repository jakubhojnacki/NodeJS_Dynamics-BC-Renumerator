/**
 * @module "DynamicsPermissionSetRenumberator" class
 * @description Handles renumberation of Dynamics permission set
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import Path from "path";
import Renumberator from "../engine/renumberator.js";
import XmlToolkit from "../xml/xmlToolkit.js";
import DynamicsObjectType from "./dynamicsObjectType.js";

export default class DynamicsPermissionSetRenumberator extends Renumberator {
    get name() { return "Permission Set Renumberator"; }
    get debug() { return global.theApplication.debug; }

    constructor(pRenumberation) {
        super(pRenumberation);
    }
    
    async canRenumber(pFilePath) {
        let result = false;
        if (Path.extname(pFilePath).trim().toLowerCase() === ".xml") {
            const xmlDocument = await XmlToolkit.readFromFile(pFilePath);
            result = (xmlDocument.PermissionSets != null);
        };
        return result;
    }

    async renumber(pFilePath) {
        this.initialise(pFilePath, false);
        await this.process(pFilePath);
        this.finalise();
    }

    async process(pFilePath) {
        const xmlDocument = await XmlToolkit.readFromFile(pFilePath);
        for (const permissionSet of xmlDocument.PermissionSets.PermissionSet)
            for (const permission of permissionSet.Permission) {
                const objectType = DynamicsPermissionSetRenumberator.parseObjectType(permission.ObjectType[0]);
                const objectNo = DynamicsPermissionSetRenumberator.parseObjectNo(permission.ObjectID[0]);
                if ((objectType.length > 0) && (objectNo > 0)) {
                    const dynamicsObject = this.engine.dynamicsObjects.get(objectType, objectNo);
                    if (dynamicsObject)
                        permission.ObjectID[0] = dynamicsObject.renumberedNo;
                }
            }
        await XmlToolkit.writeToFile(xmlDocument, this.temporaryFilePath);
    }

    static parseObjectType(pObjectTypeString) {
        let objectType = "";
        pObjectTypeString = pObjectTypeString.trim();
        switch (pObjectTypeString) {
            case "0":
            case "1":
                objectType = DynamicsObjectType.table;
                break;
            case "3":
                objectType = DynamicsObjectType.report;
                break;
            case "5":
                objectType = DynamicsObjectType.codeunit;
                break;
            case "6":
                objectType = DynamicsObjectType.xmlPort;
                break;
            case "8":
                objectType = DynamicsObjectType.page;
                break;
            case "9":
                objectType = DynamicsObjectType.query;
                break;            
        }
        return objectType;
    }

    static parseObjectNo(pObjectNoText) {
        return Number.validateAsInteger(pObjectNoText, 0);
    }
}
