/**
 * @module "DynamicsApplications" class
 * @description Represents an array of Dynamics apps
 * @version 0.0.1 (2021-02-23)
 */

import "../general/javaScript.js";
import DynamicsApplication from "./dynamicsApplication.js";

export default class DynamicsApplications extends Array {
    constructor() {        
        super();
    }

    get(pId) {
        return this.find((lApp) => { return (lApp.id === pId); });
    }   
}
