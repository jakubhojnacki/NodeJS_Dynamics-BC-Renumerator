/**
 * @module "DynamicsApp" class
 * @description Represents Dynamics application (extension)
 * @version 0.0.1 (2021-02-19)
 */

const DynamicsAppDependencies = include("/dynamics/dynamicsAppDependencies");
const DynamicsAppIdRanges = include("/dynamics/dynamicsAppIdRanges");
const DynamicsAppVersion = include("/dynamics/dynamicsAppVersion");
const Guid = include("/general/guid");

include("/general/javaScript");

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

    log() {
        const logger = global.application.logger;
        logger.writeText("Dynamics App:");
        logger.writeText(`ID = ${this.id}`, 2);
        logger.writeText(`Name = ${this.name}`, 2);
        logger.writeText(`Publisher = ${this.publisher}`, 2);
        logger.writeText(`Version = ${this.version.toString()}`, 2);
        this.webService.log(2);
    }        
}

module.exports = DynamicsApp;