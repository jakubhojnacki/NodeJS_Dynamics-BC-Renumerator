/**
 * @module "DynamicsWebServiceAdapter" class
 * @description Converting between Dynamics web service data and Dynamics objects
 */

import { DynamicsApplication } from "../dynamics/dynamicsApplication.js";
import { DynamicsDependency } from "../dynamics/dynamicsDependency.js";
import { DynamicsDependencies } from "../dynamics/dynamicsDependencies.js";
import { DynamicsObject } from "../dynamics/dynamicsObject.js";
import { DynamicsObjects } from "../dynamics/dynamicsObjects.js";
import { DynamicsObjectField } from "../dynamics/dynamicsObjectField.js";
import { DynamicsObjectType } from "../dynamics/dynamicsObjectType.js";
import { DynamicsRange } from "../dynamics/dynamicsRange.js";
import { DynamicsRanges } from "../dynamics/dynamicsRanges.js";
import { DynamicsVersion } from "../dynamics/dynamicsVersion.js";

export class DynamicsWebServiceAdapter {
    static deserialiseDynamicsApplication(pData) {
        let object = null;
        if (pData != null) {
            const version = DynamicsVersion.parse(pData.originalExtensionVersion);
            object = new DynamicsApplication(pData.originalExtensionId, pData.name, pData.extensionPublisher, version, null, null, pData.extensionId);
        }
        return object;
    }
        
    static deserialiseDynamicsDependencies(pData, pDynamicsApplication) {
        pDynamicsApplication.dependencies = new DynamicsDependencies();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                pDynamicsApplication.dependencies.push(DynamicsWebServiceAdapter.deserialiseDynamicsDependency(dataItem));
    }    

    static deserialiseDynamicsDependency(pData) {
        let object = null;
        if (pData != null) {
            const version = DynamicsVersion.parse(pData.originalDepExtensionVersion);
            object = new DynamicsDependency(pData.originalDepExtensionId, pData.depApplicationName, pData.depExtensionPublisher, version, pData.depExtensionId);
        }
        return object;
    }    
        
    static deserialiseDynamicsRanges(pData, pDynamicsApplication) {
        pDynamicsApplication.ranges = new DynamicsRanges();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                pDynamicsApplication.ranges.push(DynamicsWebServiceAdapter.deserialiseDynamicsRange(dataItem));
    }

    static deserialiseDynamicsRange(pData) {
        let object = null;
        if (pData != null)
            object = new DynamicsRange(pData.noFrom, pData.noTo);
        return object;
    }    

    static deserialiseDynamicsObjects(pData) {
        let object = new DynamicsObjects();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                object.push(DynamicsWebServiceAdapter.deserialiseDynamicsObject(dataItem));
        return object;
    }    

    static deserialiseDynamicsObject(pData) {
        let object = null;
        if (pData != null) {
            const type = DynamicsWebServiceAdapter.parseObjectType(pData.type);
            object = new DynamicsObject(type, pData.originalNo, pData.name, pData.no);
        }
        return object;
    } 
            
    static deserialiseDynamicsObjectFields(pData, pObjects) {
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
                    object.fields.push(DynamicsWebServiceAdapter.deserialiseDynamicsObjectField(dataItem, pObjects));
            }
    }    

    static deserialiseDynamicsObjectField(pData) {
        let object = null;
        if (pData != null)
            object = new DynamicsObjectField(pData.originalNo, pData.name, null, pData.no);
        return object;
    }     

    static parseObjectType(pString) {
        const string = String.validate(pString).replace(" ", "");
        return DynamicsObjectType.parse(string);
    }
}