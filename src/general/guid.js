/**
 * @module "Guid" class
 * @description Allows basic manipulation of GUIDs
 * @version 0.0.1 (2021-02-19)
 */

class Guid {
    static get empty() { return "{00000000-0000-0000-0000-000000000000}"; }

    constructor() {
    }

    static default(pValue, pDefault) {
        return pValue != null ? pValue : (pDefault != null ? pDefault : Guid.empty);
    }
}

module.exports = Guid;