/**
 * @module "DynamicsManager" class
 * @description Class for managing various Dynamics aspects
 * @version 0.0.1 (2021-02-22)
 */


__require("general/javaScript");
const DynamicsObjects = __require("/dynamics/dynamicsObjects");

class DynamicsManager {
    get objects() { return this.mObjects; }
    set objects(pValue) { this.mObjects = pValue; }

    constructor() {
        this.mObjects = null;
    }

    async readObjects() {        
        this.objects = new DynamicsObjects(); //TODO - Not implemented
    }

    getObject(pType, pId) {
        return this.objects != null ? this.objects.get(pType, pId) : null;
    }

    async reserveObject(pType) {
        return 0; //TODO - Not implemented
    }

    async reserveObjectField(pObjectType, pObjectId) {        
        return 0; //TODO - Not implemented
    }
}

module.exports = DynamicsManager;