/**
 * @module "DynamicsApplication" class
 * @description Represents Dynamics application (extension)
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import DynamicsApplicationBase from "./dynamicsApplicationBase.js";
import Guid from "../general/guid.js";
import StringBuilder from "../general/stringBuilder.js";

export default class DynamicsApplication extends DynamicsApplicationBase {
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

    log(pLogger, pIndentation) {
        let indentation = Number.validate(pIndentation);
        pLogger.writeLine("Dynamics Application:", pIndentation);
        indentation += 1;
        pLogger.writeLine(StringBuilder.nameValue("ID", this.id), indentation);
        pLogger.writeLine(StringBuilder.nameValue("Name", this.name), indentation);
        pLogger.writeLine(StringBuilder.nameValue("Publisher", this.publisher), indentation);
        pLogger.writeLine(StringBuilder.nameValue("Version", this.version.toString()), indentation);
        this.dependencies.log(pLogger, indentation);
        this.idRanges.log(pLogger, indentation);
    }        
}
