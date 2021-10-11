/**
 * @module "DynamicsObjectFields" class
 * @description Represents an array of Dynamics fields (table fields or enum values)
 */

export class DynamicsObjectFields extends Array {
    constructor() {        
        super();
    }

    toData() {
        let data = [];
        for (const field of this)
            data.push(field.toData());
        return data;
    }   

    get(pNo) {
        return this.find((lObjectField) => { return (lObjectField.no === pNo); });
    }      
}
