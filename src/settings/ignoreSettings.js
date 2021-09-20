/**
 * @module "IgnoreSettings" class
 * @description Class with settings what (directories / files) to ignore
 * @version 0.0.1 (2021-09-16)
 */

import "../general/javaScript.js";
import IgnoreNamesSettings from "./ignoreNamesSettings.js";

export default class IgnoreSettings {
    get directories() { return this.mDirectories; }
    get files() { return this.mFiles; }

    constructor(pDirectories, pFiles) {
        this.mDirectories = Object.validate(pDirectories, new IgnoreNamesSettings());
        this.mFiles = Object.validate(pFiles, new IgnoreNamesSettings());
    }

    serialise() {
        let data = {
            "directories": this.directories.serialise(),
            "files": this.files.serialise(),
        };
        return data;
    }

    static deserialise(pData) {
        let object = new IgnoreSettings();
        if (pData != null) {
            const directories = IgnoreNamesSettings.deserialise(pData.directories);
            const files = IgnoreNamesSettings.deserialise(pData.files);
            object = new IgnoreSettings(directories, files);
        }
        return object;
    }    
}