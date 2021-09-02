/**
 * @module "DynamicsApp" class
 * @description Represents Dynamics application (extension)
 * @version 0.0.1 (2021-02-19)
 */

import "../general/javaScript.js";
const DynamicsAppDependencies = require("./dynamicsAppDependencies");
const DynamicsAppIdRanges = require("./dynamicsAppIdRanges");
const DynamicsAppVersion = require("./dynamicsAppVersion");
const Guid = require("../general/guid");
const StringBuilder = require("../general/stringBuilder");

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
        this.mId = Guid.default(pId);
        this.mName = String.default(pName);
        this.mPublisher = String.default(pPublisher);
        this.mVersion = DynamicsAppVersion.default(pVersion);
        this.mDependencies = DynamicsAppDependencies.default(pDependencies);
        this.mIdRanges = DynamicsAppIdRanges.default(pIdRanges);
        this.mRenumberedId = Guid.default(pRenumberedId);
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

    log(pIndentation) {
        const logger = global.application.logger;
        let indentation = Number.default(pIndentation);
        logger.writeText("Dynamics App:", pIndentation);
        indentation += logger.tab;
        logger.writeText(StringBuilder.nameValue("ID", this.id), indentation);
        logger.writeText(StringBuilder.nameValue("Name", this.name), indentation);
        logger.writeText(StringBuilder.nameValue("Publisher", this.publisher), indentation);
        logger.writeText(StringBuilder.nameValue("Version", this.version.toString()), indentation);
        this.dependencies.log(indentation);
        this.idRanges.log(indentation);
    }        
}
