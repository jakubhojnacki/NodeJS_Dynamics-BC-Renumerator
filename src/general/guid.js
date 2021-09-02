/**
 * @module "Guid" class (static)
 * @description Allows basic manipulation of GUIDs
 * @version 0.0.1 (2021-02-19)
 */

import { v4 as UUID } from "uuid";

export default class Guid {
    static get empty() { return UUID.NIL; }

    static validate(pValue, pDefault) {
        return pValue != null ? pValue : (pDefault != null ? pDefault : Guid.empty);
    }

    static create() {
        return UUID();
    }

    static parse(pString) {
        return UUID.parse(pString);
    }
}
