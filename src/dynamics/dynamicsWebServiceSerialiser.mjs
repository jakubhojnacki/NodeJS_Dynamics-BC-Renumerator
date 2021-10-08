/**
 * @module "DynamicsWebServiceSerialiser" class
 * @description Serialising / deserialising Dynamics object from Dynamics web service data
 * @version 0.0.1 (2021-09-03)
 */

import "../general/javaScript.js";
import DynamicsApplication from "./dynamicsApplication.js";
import DynamicsDependency from "./dynamicsDependency.js";
import DynamicsDependencies from "./dynamicsDependencies.js";
import DynamicsObject from "./dynamicsObject.js";
import DynamicsObjects from "./dynamicsObjects.js";
import DynamicsObjectField from "./dynamicsObjectField.js";
import DynamicsObjectType from "./dynamicsObjectType.js";
import DynamicsRange from "./dynamicsRange.js";
import DynamicsRanges from "./dynamicsRanges.js";
import DynamicsVersion from "./dynamicsVersion.js";

export default class DynamicsWebServiceSerialiser {
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
                pDynamicsApplication.dependencies.push(DynamicsWebServiceSerialiser.deserialiseDynamicsDependency(dataItem));
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
                pDynamicsApplication.ranges.push(DynamicsWebServiceSerialiser.deserialiseDynamicsRange(dataItem));
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
                object.push(DynamicsWebServiceSerialiser.deserialiseDynamicsObject(dataItem));
        return object;
    }    

    static deserialiseDynamicsObject(pData) {
        let object = null;
        if (pData != null) {
            const type = DynamicsWebServiceSerialiser.parseObjectType(pData.type);
            object = new DynamicsObject(type, pData.originalNo, pData.name, pData.no);
        }
        return object;
    } 
            
    static deserialiseDynamicsObjectFields(pData, pObjects) {
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData) {
                let objectType = DynamicsWebServiceSerialiser.parseObjectType(dataItem.originalObjectType);
                let objectNo = dataItem.originalObjectNo;
                const extensionObjectType = DynamicsWebServiceSerialiser.parseObjectType(dataItem.originalExtensionObjectType);
                if (extensionObjectType.length > 0) {
                    objectType = extensionObjectType;
                    objectNo = dataItem.originalExtensionObjectNo;
                }
                const object = pObjects.get(objectType, objectNo);
                if (object != null)
                    object.fields.push(DynamicsWebServiceSerialiser.deserialiseDynamicsObjectField(dataItem, pObjects));
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