/**
 * @module "IgnoreSettings" class
 * @description Class with settings what (directories / files) to ignore
 */

"use strict";

import { IgnoreNamesSettings } from "../settings/ignoreNamesSettings.mjs";

export class IgnoreSettings {
    get directories() { return this.mDirectories; }
    set directories(pValue) { this.mDirectories = Object.verify(pValue, new IgnoreNamesSettings()); }
    get files() { return this.mFiles; }
    set files(pValue) { this.mFiles = Object.verify(pValue, new IgnoreNamesSettings()); }

    constructor(pDirectories, pFiles) {
        this.directories = pDirectories;
        this.files = pFiles;
    }

    validate() {
        this.directories.validate();
        this.files.validate();
    }

    toData() {
        let data = {};
        data.directories = this.directories.toData();
        data.files = this.files.toData();
        return data;
    }

    fromData(pData) {
        if (pData != null) {
            this.directories = new IgnoreNamesSettings(pData.directories);
            this.files = new IgnoreNamesSettings(pData.files);
        }
        return this;        
    }    
}