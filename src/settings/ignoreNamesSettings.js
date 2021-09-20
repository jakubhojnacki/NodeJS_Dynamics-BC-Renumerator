/**
 * @module "IgnoreNamesSettings" class
 * @description Designed to hold an array of names to ignore
 * @version 0.0.1 (2021-09-16)
 */

import "../general/javaScript.js";

export default class IgnoreNamesSettings extends Array {
    constructor() {
        super()
    }

    serialise() {
        let data = [];
        for (const objectItem of this)
            data.push(objectItem);
        return data;
    }

    static deserialise(pData) {
        let object = new IgnoreNamesSettings();
        if ((pData != null) && (Array.isArray(pData))) {
            for (const dataItem of pData)
                object.push(dataItem);
        }
        return object;
    }       
}