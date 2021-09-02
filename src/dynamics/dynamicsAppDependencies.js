/**
 * @module "DynamicsAppDependencies" class
 * @description Represents an array of dependencies
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import DynamicsAppDependency from "./dynamicsAppDependency.js";
import Guid from "../general/guid.js";

export default class DynamicsAppDependencies extends Array {
    constructor() {        
        super();
    }

    log(pLogger, pIndentation) {
        let indentation = Number.validate(pIndentation);
        pLogger.writeLine("Dependencies:", indentation);
        for (const dynamicsAppDependency of this)
            pLogger.writeLine(dynamicsAppDependency.toString(), indentation + 1);
    }
    
    static deserialise(pData) {
        let dynamicsAppDependencies = new DynamicsAppDependencies();
        if (pData != null)
            for (const data of pData)
                dynamicsAppDependencies.push(DynamicsAppDependency.deserialise(data));
        return dynamicsAppDependencies;
    }    

    inject(pData) {
        for (let data of pData) {
            const dataId = Guid.validate(data.id, data.appId);
            const dependency = this.find((lDependency) => { return lDependency.id === dataId; });
            if (dependency)
                dependency.inject(data);
        }
    }
}
