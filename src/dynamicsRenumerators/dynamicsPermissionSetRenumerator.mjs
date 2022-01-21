/**
 * @module "DynamicsPermissionSetRenumerator" class
 * @description Handles renumeration of Dynamics permission set
 */

"use strict";

import Path from "path";

import { DynamicsObjectType } from "fortah-dynamics-library";
import { Renumerator } from "../logic/renumerator.mjs";
import { XmlToolkit } from "fortah-xml-library";
import { userInfo } from "os";

export class DynamicsPermissionSetRenumerator extends Renumerator {
    get name() { return "Permission Set Renumerator"; }

    constructor(pRenumeration) {
        super(pRenumeration);
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
        this.initialise(pFilePath);
        await this.process();
        this.finalise();
    }

    async process() {
        const xmlDocument = await XmlToolkit.readFromFile(this.filePath);
        for (const permissionSet of xmlDocument.PermissionSets.PermissionSet)
            for (const permission of permissionSet.Permission) {
                const objectType = DynamicsPermissionSetRenumerator.parseObjectType(permission.ObjectType[0]);
                const objectNo = DynamicsPermissionSetRenumerator.parseObjectNo(permission.ObjectID[0]);
                if ((objectType.length > 0) && (objectNo > 0)) {
                    const dynamicsObject = this.logic.dynamicsObjects.get(objectType, objectNo);
                    if (dynamicsObject)
                        permission.ObjectID[0] = dynamicsObject.renumberedNo;
                }
            }
        await XmlToolkit.writeToFile(xmlDocument, this.filePath);
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
        return Number.verifyAsInteger(pObjectNoText, 0);
    }
}
