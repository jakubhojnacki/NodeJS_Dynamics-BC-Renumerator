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
    get isString() { return this.misString; }

    constructor(pName, pOperator, pValue, pIsString) {
        this.mName = String.validate(pName);
        this.mOperator = ODataOperator.parse(pOperator);
        this.mValue = pValue;
        this.misString = Boolean.validate(pIsString, false);
    }

    toString() {
        const valueText = this.isString ? `'${Object.toString(this.value)}'` : Object.toString(this.value);
        return `${this.name} ${ODataOperator.toString(this.operator)} ${valueText}`;
    }
}