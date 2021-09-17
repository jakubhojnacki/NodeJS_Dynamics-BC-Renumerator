/**
 * @module "ODataFilter" class
 * @description Represents ODATA filter
 * @version 0.0.1 (2021-09-03)
 */

import "../general/javaScript.js";
import ODataOperator from "./oDataOperator.js";

export default class ODataFilter {
    get parts() { return this.mParts; }
    get operator() { return this.mOperator; }

    constructor(pParts, pOperator) {
        this.mParts = pParts;
        this.mOperator = ODataOperator.parse(pOperator);
    }

    toString() {
        let string = "";
        let first = true;
        const multiple = (this.parts.length > 0);
        const prefix = multiple ? "(" : "";
        const suffix = multiple ? ")" : "";
        for (const part of this.parts) {
            string += first ? "" : ` ${ODataOperator.toString(this.operator)} `;
            string += `${prefix}${part.toString()}${suffix}`;
            first = false;
        }
        return string;
    }
}