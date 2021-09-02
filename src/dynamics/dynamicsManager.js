/**
 * @module "DynamicsManager" class
 * @description Class for managing various Dynamics aspects
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import DynamicsApps from "./dynamicsApps.js";
import DynamicsObjects from "./dynamicsObjects.js";
import Guid from "../general/guid.js";

export default class DynamicsManager {
    get apps() { return this.mApps; }
    set apps(pValue) { this.mApps = pValue; }
    get objects() { return this.mObjects; }
    set objects(pValue) { this.mObjects = pValue; }

    constructor() {
        this.mApps = null;
        this.mObjects = null;
    }

    async readApps() {
        this.apps = new DynamicsApps(); //TODO - Not implemented
    }

    getApp(pId) {
        return this.apps != null ? this.apps.get(pId) : null;
    }

    async createNewAppId() {
        return Guid.new();
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
