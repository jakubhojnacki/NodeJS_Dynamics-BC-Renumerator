/**
 * @module "DynamicsManifestSerialiser" class
 * @description Serialising and deserialising to / from Dynamics manifest
 * @version 0.0.1 (2021-09-03)
 */

import "../general/javaScript.js";
import DynamicsApplication from "./dynamicsApplication.js";
import DynamicsApplications from "./dynamicsApplications.js";
import DynamicsDependency from "./dynamicsDependency.js";
import DynamicsDependencies from "./dynamicsDependencies.js";
import DynamicsRange from "./dynamicsRange.js";
import DynamicsRanges from "./dynamicsRanges.js";
import DynamicsVersion from "./dynamicsVersion.js";

export default class DynamicsManifestSerialiser {
    static deserialiseDynamicsApplications(pData) {
        let object = new DynamicsApplications();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                object.push(DynamicsManifestSerialiser.deserialiseDynamicsApplication(dataItem));
        return object;
    }     

    static deserialiseDynamicsApplication(pData) {
        let object = null;
        if (pData != null) {
            const version = DynamicsVersion.parse(pData.version);
            const dependencies = DynamicsManifestSerialiser.deserialiseDynamicsDependencies(pData.dependencies);
            const ranges = DynamicsManifestSerialiser.deserialiseDynamicsRanges(pData.idRanges);
            object = new DynamicsApplication(pData.id, pData.name, pData.publisher, version, dependencies, ranges);
        }
        return object;
    }
        
    static deserialiseDynamicsDependencies(pData) {
        let object = new DynamicsDependencies();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                object.push(DynamicsManifestSerialiser.deserialiseDynamicsDependency(dataItem));
        return object;
    }    

    static deserialiseDynamicsDependency(pData) {
        let object = null;
        if (pData != null) {
            const id = (pData.id ? pData.id : pData.appId);
            const version = DynamicsVersion.parse(pData.version);
            object = new DynamicsDependency(id, pData.name, pData.publisher, version);
        }
        return object;
    }

    static deserialiseDynamicsRanges(pData) {
        let object = new DynamicsRanges();
        if ((pData != null) && (Array.isArray(pData)))
            for (const data of pData)
                object.push(DynamicsManifestSerialiser.deserialiseDynamicsRange(data));
        return object;
    }    

    static deserialiseDynamicsRange(pData) {
        let object = null;
        if (pData != null)
            object = new DynamicsRange(pData.from, pData.to);
        return object;
    }    

    static applyDynamicsApplication(pDynamicsApplication, pData) {
        pData.id = pDynamicsApplication.renumberedId;
        DynamicsManifestSerialiser.applyDynamicsDependencies(pDynamicsApplication.dependencies, pData.dependencies);
        DynamicsManifestSerialiser.applyDynamicsRanges(pDynamicsApplication.ranges, pData.idRanges);
    }    

    static applyDynamicsDependencies(pDynamicsDependencies, pData) {
        if (pDynamicsDependencies)
            for (const dataItem of pData) {
                const dynamicsDependency = pDynamicsDependencies.find((lDynamicsDependency) => { return lDynamicsDependency.id === dataItem.id});
                if (dynamicsDependency)
                    DynamicsManifestSerialiser.applyDynamicsDependency(dynamicsDependency, dataItem);
            }
    }

    static applyDynamicsDependency(pDynamicsDependency, pData) {
        if ("id" in pData)
            pData.id = pDynamicsDependency.renumberedId;
        else
            pData.appId = pDynamicsDependency.renumberedId;
    }

    static applyDynamicsRanges(pDynamicsRanges, pData) {
        pData.clear();
        if (pDynamicsRanges)
            for (const dynamicsRange of pDynamicsRanges) {
                let dataItem = DynamicsManifestSerialiser.serialiseDynamicsRange(dynamicsRange);
                pData.push(dataItem);
            }
    }

    static serialiseDynamicsRange(pDynamicsRange) {
        return {
            "from": pDynamicsRange.from,
            "to": pDynamicsRange.to
        };
    }    
}