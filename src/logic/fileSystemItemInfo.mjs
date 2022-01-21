/**
 * @module "FileSystemItemInfo" class
 * @description Information about file system item
 */

"use strict";

import { FileSystemItem } from "fortah-file-system-library";
import { FileSystemItemType } from "fortah-file-system-library";

export class FileSystemItemInfo extends FileSystemItem {
    get renumbered() { return this.mRenumbered; }
    set renumbered(pValue) { this.mRenumbered = Boolean.verify(pValue); }
    get renumerator() { return this.mRenumerator; }
    set renumerator(pValue) { this.mRenumerator = pValue; }

    constructor(pPath, pName, pRenumbered, pRenumerator, pIndentation) {
        super(FileSystemItemType.file, pPath, pName, pIndentation);
        this.renumbered = pRenumbered;
        this.renumerator = pRenumerator;
    }
}