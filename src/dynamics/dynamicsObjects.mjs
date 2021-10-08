/**
 * @module "DynamicsObjects" class
 * @description Represents an array of Dynamics objects
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import DynamicsObject from "./dynamicsObject.js";

export default class DynamicsObjects extends Array {
    constructor() {        
        super();
    }

    get(pType, pNo) {
        return this.find((lObject) => { return ((lObject.type === pType) && (lObject.no === pNo)); });
    }    

    serialise() {
        let data = [];
        for (const object of this)
            data.push(object.serialise());
        return data;
    }           
}
