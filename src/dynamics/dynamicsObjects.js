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

    static deserialise(pData) {
        let dynamicsObjects = new DynamicsObjects();
        if (pData != null)
            for (const data of pData)
                dynamicsObjects.push(DynamicsObject.deserialise(data));
        return dynamicsObjects;
    }      

    get(pType, pNo) {
        return this.find((lObject) => { return ((lObject.type === pType) && (lObject.no === pNo)); });
    }    
}
