/**
 * @module "Renumberator" class
 * @description Performs renumberation of Dynamics objects
 * @version 0.0.1 (2021-02-18)
 */

include("/general/javaScript");

class Renumberator {
    get sourceFolderPath() { return this.mSourceFolderPath; }
    get destinationFolderPath() { return this.mDestinationFolderPath; }

    constructor(pSourceFolderPath, pDestinationFolderPath) {
        this.mSourceFolderPath = String.default(pSourceFolderPath);
        this.mDestinationFolderPath = String.default(pDestinationFolderPath);
    }

    run() {
        this.readDynamicsApplicationManifest();
    }

    readDynamicsApplicationManifest() {
        //TODO - Not implemented
    }
}

module.exports = Renumberator;