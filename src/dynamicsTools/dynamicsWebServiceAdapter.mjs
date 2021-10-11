/**
 * @module "DynamicsWebServiceAdapter" class
 * @description Converting between Dynamics web service data and Dynamics objects
 */

import { DynamicsApplication } from "../dynamics/dynamicsApplication.mjs";
import { DynamicsDependency } from "../dynamics/dynamicsDependency.mjs";
import { DynamicsDependencies } from "../dynamics/dynamicsDependencies.mjs";
import { DynamicsObject } from "../dynamics/dynamicsObject.mjs";
import { DynamicsObjects } from "../dynamics/dynamicsObjects.mjs";
import { DynamicsObjectField } from "../dynamics/dynamicsObjectField.mjs";
import { DynamicsObjectType } from "../dynamics/dynamicsObjectType.mjs";
import { DynamicsRange } from "../dynamics/dynamicsRange.mjs";
import { DynamicsRanges } from "../dynamics/dynamicsRanges.mjs";
import { DynamicsVersion } from "../dynamics/dynamicsVersion.mjs";

export class DynamicsWebServiceAdapter {
    static dynamicsApplicationFromData(pData) {
        let dynamicsApplication = null;
        if (pData != null) {
            const version = DynamicsVersion.parse(pData.originalExtensionVersion);
            dynamicsApplication = new DynamicsApplication(pData.originalExtensionId, pData.name, pData.extensionPublisher, version, null, null, 
                pData.extensionId);
        }
        return dynamicsApplication;
    }
        
    static dynamicsDependenciesFromData(pData, pDynamicsApplication) {
        pDynamicsApplication.dependencies = new DynamicsDependencies();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                pDynamicsApplication.dependencies.push(DynamicsWebServiceAdapter.dynamicsDependencyFromData(dataItem));
    }    

    static dynamicsDependencyFromData(pData) {
        let dynamicsDependency = null;
        if (pData != null) {
            const version = DynamicsVersion.parse(pData.originalDepExtensionVersion);
            dynamicsDependency = new DynamicsDependency(pData.originalDepExtensionId, pData.depApplicationName, pData.depExtensionPublisher, version, 
                pData.depExtensionId);
        }
        return dynamicsDependency;
    }    
        
    static dynamicsRangesFromData(pData, pDynamicsApplication) {
        pDynamicsApplication.ranges = new DynamicsRanges();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                pDynamicsApplication.ranges.push(DynamicsWebServiceAdapter.dynamicsRangeFromData(dataItem));
    }

    static dynamicsRangeFromData(pData) {
        let dynamicsRange = null;
        if (pData != null)
            dynamicsRange = new DynamicsRange(pData.noFrom, pData.noTo);
        return dynamicsRange;
    }    

    static dynamicsObjectsFromData(pData) {
        let dynamicsObjects = new DynamicsObjects();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                dynamicsObjects.push(DynamicsWebServiceAdapter.dynamicsObjectFromData(dataItem));
        return dynamicsObjects;
    }    

    static dynamicsObjectFromData(pData) {
        let dynamicsObject = null;
        if (pData != null) {
            const type = DynamicsWebServiceAdapter.parseObjectType(pData.type);
            dynamicsObject = new DynamicsObject(type, pData.originalNo, pData.name, pData.no);
        }
        return dynamicsObject;
    } 
            
    static dynamicsObjectFieldsFromData(pData, pObjects) {
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData) {
                let objectType = DynamicsWebServiceAdapter.parseObjectType(dataItem.originalObjectType);
                let objectNo = dataItem.originalObjectNo;
                const extensionObjectType = DynamicsWebServiceAdapter.parseObjectType(dataItem.originalExtensionObjectType);
                if (extensionObjectType.length > 0) {
                    objectType = extensionObjectType;
                    objectNo = dataItem.originalExtensionObjectNo;
                }
                const object = pObjects.get(objectType, objectNo);
                if (object != null)
                    object.fields.push(DynamicsWebServiceAdapter.dynamicsObjectFieldFromData(dataItem, pObjects));
            }
    }    

    static dynamicsObjectFieldFromData(pData) {
        let dynamicsObjectField = null;
        if (pData != null)
            dynamicsObjectField = new DynamicsObjectField(pData.originalNo, pData.name, null, pData.no);
        return dynamicsObjectField;
    }     

    static parseObjectType(pString) {
        const string = String.validate(pString).replace(" ", "");
        return DynamicsObjectType.parse(string);
    }
}