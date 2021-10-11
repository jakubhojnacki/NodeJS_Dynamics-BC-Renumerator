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

    toData() {
        let data = super.toData();
        data.dependencies = this.dependencies.toData();
        data.ranges = this.ranges.seriallise();
        return data;
    }  

    log(pFull, pMessages, pIndentation) {
        const indentation = Number.validate(pIndentation);
        if (pFull) {
            pMessages.addInformation("Dynamics Application:", indentation);
            pMessages.addInformation(StringBuilder.nameValue("ID", this.id), indentation + 1);
            pMessages.addInformation(StringBuilder.nameValue("Name", this.name), indentation + 1);
            pMessages.addInformation(StringBuilder.nameValue("Publisher", this.publisher), indentation + 1);
            pMessages.addInformation(StringBuilder.nameValue("Version", this.version.toString()), indentation + 1);
            this.dependencies.log(pFull, pMessages, indentation + 1);
            this.ranges.log(pFull, pMessages, indentation + 1);
        } else {
            pMessages.addInformation(`Dynamics Application: ${this.toString()}`, indentation);
        }
    }        

    validate(pValidator, pTestRenumbered) {
        pValidator.setComponent(DynamicsApplication.name);
        super.validate(pValidator, pTestRenumbered);
        if (this.dependencies)
            this.dependencies.validate(pValidator, pTestRenumbered);
        if (this.ranges)
            this.ranges.validate(pValidator, pTestRenumbered);
        pValidator.restoreComponent();
    }    
}
