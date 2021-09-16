/**
 * @module "DynamicsApplication" class
 * @description Represents Dynamics application (extension)
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import DynamicsApplicationBase from "./dynamicsApplicationBase.js";
import StringBuilder from "../general/stringBuilder.js";

export default class DynamicsApplication extends DynamicsApplicationBase {
    get logger() { return global.theApplication.logger; }
    get debugMode() { return global.theApplication.debugMode; }

    get dependencies() { return this.mDependencies; }
    set dependencies(pValue) { this.mDependencies = pValue; }
    get idRanges() { return this.mIdRanges; }

    constructor(pId, pName, pPublisher, pVersion, pDependencies, pIdRanges, pRenumberedId) {
        super(pId, pName, pPublisher, pVersion, pRenumberedId);
        this.mDependencies = pDependencies;
        this.mIdRanges = pIdRanges;
    }

    inject(pData) {
        pData.id = this.renumberedlId;
        this.dependencies.inject(pData.dependencies);
        this.idRanges.inject(pData.idRanges);
    }

    toString() {
        return `${this.name} ${this.version} (ID: ${this.id}; Publisher: ${this.publisher})`;
    }

    log(pIndentation) {
        const indentation = Number.validate(pIndentation);
        if (this.debugMode) {
            this.logger.writeLine("Dynamics Application:", indentation);
            this.logger.writeLine(StringBuilder.nameValue("ID", this.id), indentation + 1);
            this.logger.writeLine(StringBuilder.nameValue("Name", this.name), indentation + 1);
            this.logger.writeLine(StringBuilder.nameValue("Publisher", this.publisher), indentation + 1);
            this.logger.writeLine(StringBuilder.nameValue("Version", this.version.toString()), indentation + 1);
            this.dependencies.log(indentation + 1);
            this.idRanges.log(indentation + 1);
        } else {
            this.logger.writeLine(`Dynamics Application: ${this.toString()}`, indentation);
        }
    }        
}
