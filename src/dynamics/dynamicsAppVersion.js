include("/general/javaScript");

class AppVersion {
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
        const appVersion = new AppVersion();
        const stringParts = pString.split(".");
        if (stringParts.length >= 1)
            appVersion.mMajor = Number.tryToParseInt(stringParts[0]);
        if (stringParts.length >= 2)
            appVersion.mMinor = Number.tryToParseInt(stringParts[1]);
        if (stringParts.length >= 3)
            appVersion.mBuild = Number.tryToParseInt(stringParts[2]);
        if (stringParts.length >= 4)
            appVersion.mRevision = Number.tryToParseInt(stringParts[3]);
        return appVersion;
    }

    default(pValue, pDefault) {
        return pValue != null ? pValue : (pDefault != null ? pDefault : new AppVersion());
    }

    toString() {
        return `${this.major}.${this.minor}.${this.build}.${this.revision}`;
    }

    compare(pAppVersion) {
        let result = this.major.compare(pAppVersion.major);
        if (result === 0)
            result = this.minor.compare(pAppVersion.minor);
        if (result === 0) 
            result = this.build.compare(pAppVersion.build);
        if (result === 0) 
            result = this.revision.compare(pAppVersion.revision);
        return result;
    }

    isEqual(pAppVersion) {
        return (this.compare(pAppVersion) === 0);
    }

    isGreater(pAppVersion) {
        return (this.compare(pAppVersion) === 1);
    }

    isLower(pAppVersion) {
        return (this.compare(pAppVersion) === -1);
    }
}

module.exports = AppVersion;