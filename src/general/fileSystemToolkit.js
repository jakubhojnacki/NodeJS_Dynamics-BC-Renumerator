/**
 * @module "FileSystemToolkit" class
 * @description Various tools to work with file system
 * @version 0.0.3 (2021-09-31)
 */

import "../general/javaScript.js";
import FileSystem from "fs";
import Path from "path";

export default class FileSystemToolkit {
    static getFileName(pFilePath) {
        return Path.parse(pFilePath).base;
    }

    static getFileNameWithoutExtension(pFilePath) {
        return Path.parse(pFilePath).name;
    }

    static getFileExtension(pFilePath) {
        return Path.parse(pFilePath).ext;
    }

    static toDirectoryName(pString) {
        const string = String.validate(pString);
        const directoryName = string.replace(/[/\\?%*:|"<>,;=]/g, "_");
        return directoryName;
    }

    static createDirectoryIfDoesntExist(pPath) {
        if (!FileSystem.existsSync(pPath))
            FileSystem.mkdirSync(pPath, { recursive: true });
    }

    static deleteIfExists(pPath) {
        if (FileSystem.existsSync(pPath))
            FileSystem.unlinkSync(pPath);
    }

    static copyFile(pSourceFilePath, pDestinationFilePath) {
        const destinationDirectoryPath = Path.dirname(pDestinationFilePath);
        this.createDirectoryIfDoesntExist(destinationDirectoryPath);
        FileSystem.copyFileSync(pSourceFilePath, pDestinationFilePath);
    }

    static renameFile(pSourceFilePath, pDestinationFilePath) {
        const destinationDirectoryPath = Path.dirname(pDestinationFilePath);
        this.createDirectoryIfDoesntExist(destinationDirectoryPath);
        FileSystem.renameSync(pSourceFilePath, pDestinationFilePath);
    }
}
