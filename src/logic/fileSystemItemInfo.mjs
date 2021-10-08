/**
 * @module "FileSystemItemInfo" class
 * @description Information about file system item
 */

import { FileSystemItem } from "file-system-library";
import { FileSystemItemType } from "file-system-library";

export class FileSystemItemInfo extends FileSystemItem {
    get renumbered() { return this.mRenumbered; }
    set renumbered(pValue) { this.mRenumbered = Boolean.validate(pValue); }
    get renumberator() { return this.mRenumberator; }
    set renumberator(pValue) { this.mRenumberator = pValue; }

    constructor(pPath, pName, pRenumbered, pRenumberator, pIndentation) {
        super(FileSystemItemType.file, pPath, pName, pIndentation);
        this.renumbered = pRenumbered;
        this.renumberator = pRenumberator;
    }
}