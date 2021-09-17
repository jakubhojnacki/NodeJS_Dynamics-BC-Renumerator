/**
 * @module "ODataFilterPart" class
 * @description Abstract class representing ODATA filter part
 * @version 0.0.1 (2021-09-03)
 */

import "../general/javaScript.js";
import ODataOperator from "./oDataOperator.js";

export default class ODataFilterPart {
    get name() { return this.mName; }
    get operator() { return this.mOperator; }
    get value() { return this.mValue; }

    constructor(pName, pOperator, pValue) {
        this.mName = String.validate(pName);
        this.mOperator = ODataOperator.parse(pOperator);
        this.mValue = pValue;
    }

    toString() {
        return `${this.name} ${ODataOperator.toString(this.operator)} ${Object.toString(this.value)}`;
    }
}