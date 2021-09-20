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
            const type = DynamicsObjectType.parse(pData.type);
            object = new DynamicsObject(type, pData.originalNo, pData.name, pData.no);
        }
        return object;
    } 
            
    static deserialiseDynamicsObjectFields(pData, pObjects) {
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData) {
                const objectType = DynamicsObjectType.parse(pData.objectType);
                const objectNo = pData.no;
                const object = pObjects.get(objectType, objectNo);

                pObjects.push(DynamicsWebServiceSerialiser.deserialiseDynamicsObjectField(dataItem, pObjects));
            }
    }    

    static deserialiseDynamicsObjectField(pData) {
        let object = null;
        if (pData != null) {
            object = new DynamicsObjectField(pData.originalNo, pData.name, null, pData.no);
        }
        return object;
    }     
}