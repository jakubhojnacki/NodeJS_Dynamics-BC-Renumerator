/**
 * @module "DynamicsAppDependency" class
 * @description Represents a dependency of Dynamics application
 * @version 0.0.1 (2021-02-20)
 */

__require("general/javaScript");
const DynamicsAppVersion = __require("dynamics/dynamicsAppVersion");
const Guid = __require("general/guid");
const StringBuilder = __require("general/stringBuilder");

class DynamicsAppDependency {
    get id() { return this.mId; }
    get name() { return this.mName; }
    get publisher() { return this.mPublisher; }
    get version() { return this.mVersion; }

    constructor(pId, pName, pPublisher, pVersion) {
        this.mId = Guid.default(pId);
        this.mName = String.default(pName);
        this.mPublisher = String.default(pPublisher);
        this.mVersion = DynamicsAppVersion.default(pVersion);
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