/**
 * @module "DynamicsManager" class
 * @description Class for managing various Dynamics aspects
 * @version 0.0.1 (2021-02-22)
 */

__require("general/javaScript");

class DynamicsManager {
    get objects() { return this.mObjects; }

    constructor() {
        this.mObjects = null;
    }

    async readObjects() {
        //TODO - Not implemented
    }

    getObject(pType, pId) {
        return this.objects != null ? this.objects.get(pType, pId) : null;
    }

    async reserveObject(pType) {
        //TODO - Not implemented
    }

    async reserveObjectField(pObjectType, pObjectId) {
        //TODO - Not implemented
    }
}

module.exports = DynamicsManager;