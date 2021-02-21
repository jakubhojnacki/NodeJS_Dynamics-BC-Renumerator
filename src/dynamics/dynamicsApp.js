/**
 * @module "DynamicsApp" class
 * @description Represents Dynamics application (extension)
 * @version 0.0.1 (2021-02-19)
 */

__require("/general/javaScript");

const DynamicsAppDependencies = __require("/dynamics/dynamicsAppDependencies");
const DynamicsAppIdRanges = __require("/dynamics/dynamicsAppIdRanges");
const DynamicsAppVersion = __require("/dynamics/dynamicsAppVersion");
const Guid = __require("/general/guid");
const StringBuilder = __require("/general/stringBuilder");

class DynamicsApp {
    get id() { return this.mId; }
    get name() { return this.mName; }
    get publisher() { return this.mPublisher; }
    get version() { return this.mVersion; }
    get dependencies() { return this.mDependencies; }
    get idRanges() { return this.mIdRanges; }

    constructor(pId, pName, pPublisher, pVersion, pDependencies, pIdRanges) {
        this.mId = Guid.default(pId);
        this.mName = String.default(pName);
        this.mPublisher = String.default(pPublisher);
        this.mVersion = DynamicsAppVersion.default(pVersion);
        this.mDependencies = DynamicsAppDependencies.default(pDependencies);
        this.mIdRanges = DynamicsAppIdRanges.default(pIdRanges);
    }

    static deserialise(pData) {
        let dynamicsApp = null;
        if (pData != null) {
            const id = Guid.default(pData.id);
            const name = String.default(pData.name);
            const publisher = String.default(pData.publisher);
            const version = DynamicsAppVersion.parse(pData.version);
            const dependencies = DynamicsAppDependencies.deserialise(pData.dependencies);
            const idRanges = DynamicsAppIdRanges.deserialise(pData.idRanges);
            dynamicsApp = new DynamicsApp(id, name, publisher, version, dependencies, idRanges);
        }
        return dynamicsApp;
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

module.exports = DynamicsApp;