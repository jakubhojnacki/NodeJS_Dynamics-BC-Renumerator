/**
 * @module "DirectoryEventInfo" class
 * @description Holds information about directory when an event is raised
 * @version 0.0.1 (2021-09-21)
 */

import "../general/javaScript.js";

export default class DirectoryEventInfo {
    get path() { return this.mPath; }
    get name() { return this.mName; }
    get indentation() { return this.mIndentation; }

    constructor(pPath, pName, pIndentation) {
        this.mPath = String.validate(pPath);
        this.mName = String.validate(pName);
        this.mIndentation = Number.validateAsInteger(pIndentation);
    }
}