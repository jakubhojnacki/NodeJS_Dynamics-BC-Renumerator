/**
 * @module "DynamicsApplication" class
 * @description Represents Dynamics application (extension)
 */

import { DynamicsApplicationBase } from "../dynamics/dynamicsApplicationBase.mjs";
import { StringBuilder } from "core-library";
import { Validator } from "core-library";

export class DynamicsApplication extends DynamicsApplicationBase {
    get terminal() { return global.theApplication.terminal; }
    get debug() { return global.theApplication.debug; }

    get dependencies() { return this.mDependencies; }
    set dependencies(pValue) { this.mDependencies = pValue; }
    get ranges() { return this.mRanges; }
    set ranges(pValue) { this.mRanges = pValue; }

    constructor(pId, pName, pPublisher, pVersion, pDependencies, pRanges, pRenumberedId) {
        super(pId, pName, pPublisher, pVersion, pRenumberedId);
        this.mDependencies = pDependencies;
        this.mRanges = pRanges;
    }

    toString() {
        return `${this.name} ${this.version} (ID: ${this.id}; Publisher: ${this.publisher})`;
    }

    //TODO - Review the whole function
    log(pIndentation) {
        const indentation = Number.validate(pIndentation);
        if (this.debug.enabled) {
            this.terminal.writeLine("Dynamics Application:", indentation);
            this.terminal.writeLine(StringBuilder.nameValue("ID", this.id), indentation + 1);
            this.terminal.writeLine(StringBuilder.nameValue("Name", this.name), indentation + 1);
            this.terminal.writeLine(StringBuilder.nameValue("Publisher", this.publisher), indentation + 1);
            this.terminal.writeLine(StringBuilder.nameValue("Version", this.version.toString()), indentation + 1);
            this.dependencies.log(indentation + 1);
            this.ranges.log(indentation + 1);
        } else {
            this.terminal.writeLine(`Dynamics Application: ${this.toString()}`, indentation);
        }
    }        

    //TODO - Review the whole function
    validate(pValidator, pRaiseError, pWithRenumbered) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        const withRenumbered = Boolean.validate(pWithRenumbered);
        super.validate(DynamicsApplication.name, pValidator, withRenumbered);
        if (this.dependencies)
            this.dependencies.validate(validator, false, withRenumbered);
        if (this.ranges)
            this.ranges.validate(validator, false, withRenumbered);
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }    

    //TODO - Change name
    serialise() {
        let data = super.serialise();
        data.dependencies = this.dependencies.serialise();
        data.ranges = this.ranges.seriallise();
        return data;
    }    
}
