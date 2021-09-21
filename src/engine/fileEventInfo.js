/**
 * @module "FileEventInfo" class
 * @description Holds information about a file when an event is raised
 * @version 0.0.1 (2021-09-21)
 */

import "../general/javaScript.js";

export default class FileEventInfo {
    get path() { return this.mPath; }
    get name() { return this.mName; }
    get renumbered() { return this.mRenumbered; }
    get renumberator() { return this.mRenumberator; }
    get indentation() { return this.mIndentation; }

    constructor(pPath, pName, pRenumbered, pRenumberator, pIndentation) {
        this.mPath = String.validate(pPath);
        this.mName = String.validate(pName);
        this.mRenumbered = Boolean.validate(pRenumbered);
        this.mRenumberator = pRenumberator;
        this.mIndentation = Number.validateAsInteger(pIndentation);
    }
}