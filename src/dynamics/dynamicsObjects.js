/**
 * @module "DynamicsObjects" class
 * @description Represents an array of Dynamics objects
 * @version 0.0.1 (2021-02-22)
 */

__require("general/javaScript");
const DynamicsObject = __require("dynamics/dynamicsObject");

class DynamicsObjects extends Array {
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

    get(pType, pId) {
        return this.find((lObject) => { return ((lObject.type === pType) && (lObject.id === pId)); });
    }    
}

module.exports = DynamicsObjects;