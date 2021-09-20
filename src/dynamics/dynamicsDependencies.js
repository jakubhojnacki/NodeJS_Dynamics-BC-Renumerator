/**
 * @module "DynamicsDependencies" class
 * @description Represents an array of dependencies
 * @version 0.0.2 (2021-09-03)
 */

import "../general/javaScript.js";
import Guid from "../general/guid.js";

export default class DynamicsDependencies extends Array {
    get terminal() { return global.theApplication.terminal; }

    constructor() {        
        super();
    }

    log(pIndentation) {
        const indentation = Number.validate(pIndentation);
        this.terminal.writeLine("Dependencies:", indentation);
        for (const dynamicsDependency of this)
            this.terminal.writeLine(dynamicsDependency.toString(), indentation + 1);
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

    get(pId) {
        return this.find((lDynamicsDependency) => { return (lDynamicsDependency.id === pId); });
    }      
}
