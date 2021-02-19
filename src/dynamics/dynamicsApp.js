/**
 * @module "DynamicsApp" class
 * @description Represents Dynamics application (extension)
 * @version 0.0.1 (2021-02-19)
 */

include("/dynamics/dynamicsAppDependencies");
include("/dynamics/dynamicsAppDependency");
include("/dynamics/dynamicsAppIdRange");
include("/dynamics/dynamicsAppIdRanges");
include("/dynamics/dynamicsAppVersion");
include("/general/javaScript");

const Guid = include("/general/guid");

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
        let dynamicsApp = new DynamicsApp();
        dynamicsApp.mId = Guid.default(pData.id);
        dynamicsApp.mName = String.default(pData.name);
        dynamicsApp.mPublisher = String.default(pData.publisher);
        dynamicsApp.mVersion = AppVersion.parse(pData.version);
        dynamicsApp.mDependencies = DynamicsAppDependencies.deserialise(pData.dependencies);
        dynamicsApp.mIdRanges = DynamcisAppIdRanges.deserialise(pData.idRanges);
        return dynamicsApp;
    }
}

module.exports = DynamicsApp;