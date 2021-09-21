/**
 * @module "Enum" class
 * @description Enum helper class (static)
 * @version 0.0.2 (2021-05-25)
 */

import "./javaScript.js";

export default class Enum {
    static parse(pString, pItems, pEnumName) {
        Enum.validateItems(pItems, pEnumName);
        const string = String.validate(pString).trim().toLowerCase();
        let value = "";
        let item = null;
        if (string.length > 0) {
            if (item == null)
                item = pItems.find((lItem) => { return lItem.string ? lItem.string.trim().toLowerCase() === string : false; });
            if (item == null)          
                item = pItems.find((lItem) => { return lItem.value ? lItem.value.trim().toLowerCase() === string : false; });
            if (item == null) {
                const firstItem = pItems[0];
                item = firstItem.string ? firstItem.string : firstItem.value;
            }
            if (item == null)
                throw new Error(`Value ${pString} cannot be parsed into ${pEnumName}.`);
            value = item.value;
        }
        return value;
    }

    static toString(pValue, pItems, pEnumName) {
        Enum.validateItems(pItems, pEnumName);
        const value = pValue.trim().toLowerCase();
        let string = "";
        const item = pItems.find((lItem) => { return lItem.value.trim().toLowerCase() == value; });
        if (item)
            string = item.string ? item.string : item.value;
        return string;
    }

    static validateItems(pItems, pEnumName) {
        if ((pItems == null) || (!Array.isArray(pItems)) || (pItems.length == 0)) 
            throw new Error(`${pEnumName} has incorrect list of items.`);
    }
}
