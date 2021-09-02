/**
 * @module "DynamicsApp" class
 * @description Represents Dynamics application (extension)
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
import DynamicsAppDependencies from "./dynamicsAppDependencies.js";
import DynamicsAppIdRanges from "./dynamicsAppIdRanges.js";
import DynamicsAppVersion from "./dynamicsAppVersion.js";
import Guid from "../general/guid.js";
import StringBuilder from "../general/stringBuilder.js";

export default class DynamicsApp {
    get id() { return this.mId; }
    get name() { return this.mName; }
    get publisher() { return this.mPublisher; }
    get version() { return this.mVersion; }
    get dependencies() { return this.mDependencies; }
    get idRanges() { return this.mIdRanges; }
    get renumberedId() { return this.mRenumberedId; }
    set renumberedId(pValue) { this.mRenumberedId = pValue; }

    constructor(pId, pName, pPublisher, pVersion, pDependencies, pIdRanges, pRenumberedId) {
        this.mId = Guid.validate(pId);
        this.mName = String.validate(pName);
        this.mPublisher = String.validate(pPublisher);
        this.mVersion = pVersion;
        this.mDependencies = pDependencies;
        this.mIdRanges = pIdRanges;
        this.mRenumberedId = Guid.validate(pRenumberedId);
    }

    static deserialise(pData) {
        let dynamicsApp = null;
        if (pData != null) {
            const version = DynamicsAppVersion.parse(pData.version);
            const dependencies = DynamicsAppDependencies.deserialise(pData.dependencies);
            const idRanges = DynamicsAppIdRanges.deserialise(pData.idRanges);
            dynamicsApp = new DynamicsApp(pData.id, pData.name, pData.publisher, version, dependencies, idRanges);
        }
        return dynamicsApp;
    }

    inject(pData) {
        pData.id = this.renumberedId;
        this.dependencies.inject(pData.dependencies);
        this.idRanges.inject(pData.idRanges);
    }

    log(pLogger, pIndentation) {
        let indentation = Number.validate(pIndentation);
        pLogger.writeLine("Dynamics App:", pIndentation);
        indentation += 1;
        pLogger.writeLine(StringBuilder.nameValue("ID", this.id), indentation);
        pLogger.writeLine(StringBuilder.nameValue("Name", this.name), indentation);
        pLogger.writeLine(StringBuilder.nameValue("Publisher", this.publisher), indentation);
        pLogger.writeLine(StringBuilder.nameValue("Version", this.version.toString()), indentation);
        this.dependencies.log(pLogger, indentation);
        this.idRanges.log(pLogger, indentation);
    }        
}
