/**
 * @module "DynamicsManifestAdapter" class
 * @description Converting between Dynamics manifest and corresponding class
 */

import { DynamicsApplication } from "../dynamics/dynamicsApplication.mjs";
import { DynamicsApplications } from "../dynamics/dynamicsApplications.mjs";
import { DynamicsDependency } from "../dynamics/dynamicsDependency.mjs";
import { DynamicsDependencies } from "../dynamics/dynamicsDependencies.mjs";
import { DynamicsRange } from "../dynamics/dynamicsRange.mjs";
import { DynamicsRanges } from "../dynamics/dynamicsRanges.mjs";
import { DynamicsVersion } from "../dynamics/dynamicsVersion.mjs";

export class DynamicsManifestAdapter {
    static dynamicsApplicationsFromData(pData) {
        let object = new DynamicsApplications();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                object.push(DynamicsManifestAdapter.dynamicsApplicationFromData(dataItem));
        return object;
    }     

    static dynamicsApplicationFromData(pData) {
        let object = null;
        if (pData != null) {
            const version = DynamicsVersion.parse(pData.version);
            const dependencies = DynamicsManifestAdapter.dynamicsDependenciesFromData(pData.dependencies);
            const ranges = DynamicsManifestAdapter.dynamicsRangesFromData(pData.idRanges);
            object = new DynamicsApplication(pData.id, pData.name, pData.publisher, version, dependencies, ranges);
        }
        return object;
    }
        
    static dynamicsDependenciesFromData(pData) {
        let object = new DynamicsDependencies();
        if ((pData != null) && (Array.isArray(pData)))
            for (const dataItem of pData)
                object.push(DynamicsManifestAdapter.dynamicsDependencyFromData(dataItem));
        return object;
    }    

    static dynamicsDependencyFromData(pData) {
        let object = null;
        if (pData != null) {
            const id = (pData.id ? pData.id : pData.appId);
            const version = DynamicsVersion.parse(pData.version);
            object = new DynamicsDependency(id, pData.name, pData.publisher, version);
        }
        return object;
    }

    static dynamicsRangesFromData(pData) {
        let object = new DynamicsRanges();
        if ((pData != null) && (Array.isArray(pData)))
            for (const data of pData)
                object.push(DynamicsManifestAdapter.dynamicsRangeFromData(data));
        return object;
    }    

    static dynamicsRangeFromData(pData) {
        let object = null;
        if (pData != null)
            object = new DynamicsRange(pData.from, pData.to);
        return object;
    }    

    static applyDynamicsApplicationToData(pDynamicsApplication, pData) {
        pData.id = pDynamicsApplication.renumberedId;
        DynamicsManifestAdapter.applyDynamicsDependenciesToData(pDynamicsApplication.dependencies, pData.dependencies);
        DynamicsManifestAdapter.applyDynamicsRangesToData(pDynamicsApplication.ranges, pData.idRanges);
    }    

    static applyDynamicsDependenciesToData(pDynamicsDependencies, pData) {
        if (pDynamicsDependencies)
            for (const dataItem of pData) {
                const dataItemId = dataItem.id ? dataItem.id : dataItem.appId;
                const dynamicsDependency = pDynamicsDependencies.find((lDynamicsDependency) => { return lDynamicsDependency.id === dataItemId});
                if (dynamicsDependency)
                    DynamicsManifestAdapter.applyDynamicsDependencyToData(dynamicsDependency, dataItem);
            }
    }

    static applyDynamicsDependencyToData(pDynamicsDependency, pData) {
        if ("id" in pData)
            pData.id = pDynamicsDependency.renumberedId;
        else
            pData.appId = pDynamicsDependency.renumberedId;
    }

    static applyDynamicsRangesToData(pDynamicsRanges, pData) {
        pData.clear();
        if (pDynamicsRanges)
            for (const dynamicsRange of pDynamicsRanges) {
                let dataItem = DynamicsManifestAdapter.dynamicsRangeToData(dynamicsRange);
                pData.push(dataItem);
            }
    }

    static dynamicsRangeToData(pDynamicsRange) {
        return {
            "from": pDynamicsRange.from,
            "to": pDynamicsRange.to
        };
    }    
}