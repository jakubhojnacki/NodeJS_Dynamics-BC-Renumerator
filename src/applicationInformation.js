/**
 * @module "ApplicationInformation" class
 * @description Stores application information
 * @version 0.0.1 (2021-02-17)
 */

__require("/general/javaScript");

class ApplicationInformation {
    get name() { return this.mName; }
    get description() { return this.mDescription; }
    get version() { return this.mVersion; }
    get author() { return this.mAuthor; }
    get date() { return this.mDate; }

    constructor(pName, pDescription, pVersion, pAuthor, pDate) {
        this.mName = String.default(pName);
        this.mDescription = String.default(pDescription);
        this.mVersion = String.default(pVersion);
        this.mAuthor = String.default(pAuthor);
        this.mDate = String.default(pDate);
    }

    toString() {
        return `${this.name} - ${this.version} - ${this.author} - ${this.date}`;
    }
}

module.exports = ApplicationInformation;