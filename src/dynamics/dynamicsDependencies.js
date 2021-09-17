/**
 * @module "DynamicsDependencies" class
 * @description Represents an array of dependencies
 * @version 0.0.2 (2021-09-03)
 */

import "../general/javaScript.js";
import Guid from "../general/guid.js";

export default class DynamicsDependencies extends Array {
    get logger() { return global.theApplication.logger; }

    constructor() {        
        super();
    }

    log(pIndentation) {
        const indentation = Number.validate(pIndentation);
        this.logger.writeLine("Dependencies:", indentation);
        for (const dynamicsDependency of this)
            this.logger.writeLine(dynamicsDependency.toString(), indentation + 1);
    }

    inject(pData) {
        for (let data of pData) {
            const dataId = Guid.validate(data.id, data.appId);
            const dependency = this.find((lDependency) => { return lDependency.id === dataId; });
            if (dependency)
                dependency.inject(data);
        }
    }

    validate(pValidator, pRaiseError, pWithRenumbered) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        for (const dependency of this)
            dependency.validate(pValidator, false, pWithRenumbered);
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }   
}
