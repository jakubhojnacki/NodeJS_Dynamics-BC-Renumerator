/**
 * @module "Guid" class (static)
 * @description Allows basic manipulation of GUIDs
 * @version 0.0.1 (2021-02-19)
 */

const uuid = require("uuid");

export default class Guid {
    static get empty() { return uuid.NIL; }

    static default(pValue, pDefault) {
        return pValue != null ? pValue : (pDefault != null ? pDefault : Guid.empty);
    }

    static create() {
        return uuid.v4();
    }

    static parse(pString) {
        return uuid.parse(pString);
    }
}
