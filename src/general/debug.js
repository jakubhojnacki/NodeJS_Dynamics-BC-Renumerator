/**
 * @module "Debug" class
 * @description Class providinv various diagnostics features
 * @version 0.0.1 (2021-09-20)
 */

import "../general/javaScript.js";
import FileSystem from "fs";
import FileSystemToolkit from "./fileSystemToolkit.js";
import Path from "path";

export default class Debug {
    get enabled() { return this.mEnabled; }
    get directoryPath() { return this.mDirectoryPath; }

    constructor(pEnabled, pDirectoryPath) {
        this.mEnabled = Boolean.validate(pEnabled);
        this.mDirectoryPath = String.validate(pDirectoryPath);
    }

    dump(pName, pExtension, pContent) {
        let result = false;
        if ((this.enabled) && (this.directoryPath)) {
            const timestamp = Date.createFileTimeStamp(" ");
            const name = FileSystemToolkit.toFileName(pName);
            const fileName = `${timestamp} ${name}.${pExtension}`; 
            const filePath = Path.join(this.directoryPath, fileName);
            FileSystem.writeFileSync(filePath, pContent);
        }
        return result;
    }

    dumpJson(pName, pContent) {
        return this.dump(pName, "json", JSON.stringify(pContent));
    }
}