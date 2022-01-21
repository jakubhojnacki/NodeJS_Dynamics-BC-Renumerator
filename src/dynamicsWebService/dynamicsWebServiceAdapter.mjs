/**
 * @module "DynamicsWebServiceAdapter" class
 * @description Converting between Dynamics web service data and Dynamics objects
 */

"use strict";

import { DynamicsApplicationEx } from "../dynamics/dynamicsApplicationEx.mjs";
import { DynamicsDependencyEx } from "../dynamics/dynamicsDependencyEx.mjs";
import { DynamicsDependencies } from "fortah-dynamics-library";
import { DynamicsObjectEx } from "../dynamics/dynamicsObjectEx.mjs";
import { DynamicsObjects } from "fortah-dynamics-library";
import { DynamicsFieldEx } from "../dynamics/dynamicsFieldEx.mjs";
import { DynamicsFields } from "fortah-dynamics-library";
import { DynamicsObjectType } from "fortah-dynamics-library";
import { DynamicsRangeEx } from "../dynamics/dynamicsRangeEx.mjs";
import { DynamicsRanges } from "fortah-dynamics-library";
import { DynamicsVersion } from "fortah-dynamics-library";

export class DynamicsWebServiceAdapter {
    static dynamicsApplicationFromData(pData) {
        let dynamicsApplication = null;
        if (pData != null) {
            const version = DynamicsVersion.parse(pData.originalExtensionVersion);
            dynamicsApplication = new DynamicsApplicationEx(pData.originalExtensionId, pData.name, pData.extensionPublisher, version, null, null, 
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
            dynamicsDependency = new DynamicsDependencyEx(pData.originalDepExtensionId, pData.depApplicationName, pData.depExtensionPublisher, version, 
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
            dynamicsRange = new DynamicsRangeEx(pData.noFrom, pData.noTo);
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
            dynamicsObject = new DynamicsObjectEx(type, pData.originalNo, pData.name, null, null, pData.no);
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
                if (object != null) {
                    if (!object.fields)   
                        object.fields = new DynamicsFields();
                    object.fields.push(DynamicsWebServiceAdapter.dynamicsObjectFieldFromData(dataItem, pObjects));
                }
            }
    }    

    static dynamicsObjectFieldFromData(pData) {
        let dynamicsObjectField = null;
        if (pData != null)
            dynamicsObjectField = new DynamicsFieldEx(pData.originalNo, pData.name, null, pData.no);
        return dynamicsObjectField;
    }     

    static parseObjectType(pString) {
        const string = String.verify(pString).replace(" ", "");
        return DynamicsObjectType.parse(string);
    }
}