/**
 * @module "DynamicsDependencies" class
 * @description Represents an array of dependencies
 * @version 0.0.2 (2021-09-03)
 */

import "../general/javaScript.js";
import DynamicsDependency from "./dynamicsDependency.js";
import Guid from "../general/guid.js";

export default class DynamicsDependencies extends Array {
    constructor() {        
        super();
    }

    log(pLogger, pIndentation) {
        let indentation = Number.validate(pIndentation);
        pLogger.writeLine("Dependencies:", indentation);
        for (const dynamicsDependency of this)
            pLogger.writeLine(dynamicsDependency.toString(), indentation + 1);
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
