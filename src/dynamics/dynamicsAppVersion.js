/**
 * @module "DynamicsAppVersion" class
 * @description Represents Dynamics application version
 * @version 0.0.1 (2021-02-20)
 */

import "../general/javaScript.js";

export default class DynamicsAppVersion {
    get major() { return this.mMajor; }
    get minor() { return this.mMinor; }
    get build() { return this.mBuild; }
    get revision() { return this.mRevision; }

    constructor(pMajor, pMinor, pBuild, pRevision) {
        this.mMajor = Number.default(pMajor);
        this.mMinor = Number.default(pMinor);
        this.mBuild = Number.default(pBuild);
        this.mRevision = Number.default(pRevision);
    }

    static parse(pString) {
        const stringParts = pString.split(".");
        const major = (stringParts.length >= 1 ? Number.tryToParseInt(stringParts[0]) : 0);
        const minor = (stringParts.length >= 2 ? Number.tryToParseInt(stringParts[1]) : 0);
        const build = (stringParts.length >= 3 ? Number.tryToParseInt(stringParts[2]) : 0);
        const revision = (stringParts.length >= 4 ? Number.tryToParseInt(stringParts[3]) : 0);
        return new DynamicsAppVersion(major, minor, build, revision);
    }

    static default(pValue, pDefault) {
        return pValue != null ? pValue : (pDefault != null ? pDefault : new DynamicsAppVersion());
    }

    toString() {
        return `${this.major}.${this.minor}.${this.build}.${this.revision}`;
    }

    compare(pDynamicsAppVersion) {
        let result = this.major.compare(pDynamicsAppVersion.major);
        if (result === 0)
            result = this.minor.compare(pDynamicsAppVersion.minor);
        if (result === 0) 
            result = this.build.compare(pDynamicsAppVersion.build);
        if (result === 0) 
            result = this.revision.compare(pDynamicsAppVersion.revision);
        return result;
    }

    isEqual(pDynamicsAppVersion) {
        return (this.compare(pDynamicsAppVersion) === 0);
    }

    isGreater(pDynamicsAppVersion) {
        return (this.compare(pDynamicsAppVersion) === 1);
    }

    isLower(pDynamicsAppVersion) {
        return (this.compare(pDynamicsAppVersion) === -1);
    }
}
