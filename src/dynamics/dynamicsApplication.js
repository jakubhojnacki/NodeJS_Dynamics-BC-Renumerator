/**
 * @module "DynamicsApplication" class
 * @description Represents Dynamics application (extension)
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import DynamicsApplicationBase from "./dynamicsApplicationBase.js";
import StringBuilder from "../general/stringBuilder.js";
import Validator from "../general/validator.js";

export default class DynamicsApplication extends DynamicsApplicationBase {
    get terminal() { return global.theApplication.terminal; }
    get debug() { return global.theApplication.debug; }

    get dependencies() { return this.mDependencies; }
    set dependencies(pValue) { this.mDependencies = pValue; }
    get idRanges() { return this.mIdRanges; }

    constructor(pId, pName, pPublisher, pVersion, pDependencies, pIdRanges, pRenumberedId) {
        super(pId, pName, pPublisher, pVersion, pRenumberedId);
        this.mDependencies = pDependencies;
        this.mIdRanges = pIdRanges;
    }

    toString() {
        return `${this.name} ${this.version} (ID: ${this.id}; Publisher: ${this.publisher})`;
    }

    log(pIndentation) {
        const indentation = Number.validate(pIndentation);
        if (this.debug.enabled) {
            this.terminal.writeLine("Dynamics Application:", indentation);
            this.terminal.writeLine(StringBuilder.nameValue("ID", this.id), indentation + 1);
            this.terminal.writeLine(StringBuilder.nameValue("Name", this.name), indentation + 1);
            this.terminal.writeLine(StringBuilder.nameValue("Publisher", this.publisher), indentation + 1);
            this.terminal.writeLine(StringBuilder.nameValue("Version", this.version.toString()), indentation + 1);
            this.dependencies.log(indentation + 1);
            this.idRanges.log(indentation + 1);
        } else {
            this.terminal.writeLine(`Dynamics Application: ${this.toString()}`, indentation);
        }
    }        

    validate(pValidator, pRaiseError, pWithRenumbered) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        const withRenumbered = Boolean.validate(pWithRenumbered);
        super.validate(DynamicsApplication.name, pValidator, withRenumbered);
        if (this.dependencies)
            this.dependencies.validate(validator, false, withRenumbered);
        if (this.idRanges)
            this.idRanges.validate(validator, false, withRenumbered);
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }    

    serialise() {
        let data = super.serialise();
        data.dependencies = this.dependencies.serialise();
        data.idRanges = this.idRanges.seriallise();
        return data;
    }    
}
