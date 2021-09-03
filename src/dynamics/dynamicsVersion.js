/**
 * @module "DynamicsVersion" class
 * @description Represents Dynamics (application) version
 * @version 0.0.1 (2021-02-20)
 */

import "../general/javaScript.js";

export default class DynamicsVersion {
    get major() { return this.mMajor; }
    get minor() { return this.mMinor; }
    get build() { return this.mBuild; }
    get revision() { return this.mRevision; }

    constructor(pMajor, pMinor, pBuild, pRevision) {
        this.mMajor = Number.validate(pMajor);
        this.mMinor = Number.validate(pMinor);
        this.mBuild = Number.validate(pBuild);
        this.mRevision = Number.validate(pRevision);
    }

    static parse(pString) {
        const stringParts = pString.split(".");
        const major = (stringParts.length >= 1 ? Number.validateAsInteger(stringParts[0]) : 0);
        const minor = (stringParts.length >= 2 ? Number.validateAsInteger(stringParts[1]) : 0);
        const build = (stringParts.length >= 3 ? Number.validateAsInteger(stringParts[2]) : 0);
        const revision = (stringParts.length >= 4 ? Number.validateAsInteger(stringParts[3]) : 0);
        return new DynamicsVersion(major, minor, build, revision);
    }

    toString() {
        return `${this.major}.${this.minor}.${this.build}.${this.revision}`;
    }

    compare(pDynamicsVersion) {
        let result = this.major.compare(pDynamicsVersion.major);
        if (result === 0)
            result = this.minor.compare(pDynamicsVersion.minor);
        if (result === 0) 
            result = this.build.compare(pDynamicsVersion.build);
        if (result === 0) 
            result = this.revision.compare(pDynamicsVersion.revision);
        return result;
    }

    isEqual(pDynamicsVersion) {
        return (this.compare(pDynamicsVersion) === 0);
    }

    isGreater(pDynamicsVersion) {
        return (this.compare(pDynamicsVersion) === 1);
    }

    isLower(pDynamicsVersion) {
        return (this.compare(pDynamicsVersion) === -1);
    }
}
