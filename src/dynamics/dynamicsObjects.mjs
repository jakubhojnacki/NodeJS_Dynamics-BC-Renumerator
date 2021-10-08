/**
 * @module "DynamicsObjects" class
 * @description Represents an array of Dynamics objects
 */

export class DynamicsObjects extends Array {
    constructor() {        
        super();
    }

    get(pType, pNo) {
        return this.find((lObject) => { return ((lObject.type === pType) && (lObject.no === pNo)); });
    }    

    //TODO - Review
    serialise() {
        let data = [];
        for (const object of this)
            data.push(object.serialise());
        return data;
    }           
}
