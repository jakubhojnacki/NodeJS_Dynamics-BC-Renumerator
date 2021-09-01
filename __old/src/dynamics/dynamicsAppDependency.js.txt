/**
 * @module "DynamicsAppDependency" class
 * @description Represents a dependency of Dynamics application
 * @version 0.0.1 (2021-02-20)
 */

require("../general/javaScript");

const DynamicsAppVersion = require("./dynamicsAppVersion");
const Guid = require("../general/guid");
const StringBuilder = require("../general/stringBuilder");

class DynamicsAppDependency {
    get id() { return this.mId; }
    get name() { return this.mName; }
    get publisher() { return this.mPublisher; }
    get version() { return this.mVersion; }
    get renumberedId() { return this.mRenumberedId; }
    set renumberedId(pValue) { this.mRenumberedId = pValue; }

    constructor(pId, pName, pPublisher, pVersion, pRenumberedId) {
        this.mId = Guid.default(pId);
        this.mName = String.default(pName);
        this.mPublisher = String.default(pPublisher);
        this.mVersion = DynamicsAppVersion.default(pVersion);
        this.mRenumberedId = Guid.default(pRenumberedId);
    }

    static deserialise(pData) {
        let dynamicsAppDependency = null;
        if (pData != null) {
            const id = (pData.id ? pData.id : pData.appId);
            const version = DynamicsAppVersion.parse(pData.version);
            dynamicsAppDependency = new DynamicsAppDependency(id, pData.name, pData.publisher, version);
        }
        return dynamicsAppDependency;
    }

    inject(pData) {
        if ("id" in pData)
            pData.id = this.renumberedId;
        else
            pData.appId = this.renumberedId;
    }

    toString() {
        const stringBuilder = new StringBuilder();
        stringBuilder.addNameValue("Id", this.id);
        stringBuilder.addNameValue("Name", this.name);
        stringBuilder.addNameValue("Publisher", this.publisher);
        stringBuilder.addNameValue("Version", this.version.toString());
        return stringBuilder.toString();
    }
}

module.exports = DynamicsAppDependency;