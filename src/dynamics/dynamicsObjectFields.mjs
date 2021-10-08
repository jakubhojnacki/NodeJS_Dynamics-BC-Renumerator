/**
 * @module "DynamicsObjectFields" class
 * @description Represents an array of Dynamics fields (table fields or enum values)
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import DynamicsObjectField from "./dynamicsObjectField.js";

export default class DynamicsObjectFields extends Array {
    constructor() {        
        super();
    }

    serialise() {
        let data = [];
        for (const field of this)
            data.push(field.serialise());
        return data;
    }   

    get(pNo) {
        return this.find((lObjectField) => { return (lObjectField.no === pNo); });
    }      
}
