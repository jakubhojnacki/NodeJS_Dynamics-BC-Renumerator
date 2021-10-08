/**
 * @module "IgnoreNamesSettings" class
 * @description Designed to hold an array of names to ignore
 */

export class IgnoreNamesSettings extends Array {
    constructor() {
        super();
    }

    validate() {        
    }

    toData() {
        let data = [];
        for (const item of this)
            data.push(item);
        return data;
    }

    fromData(pData) {
        if (pData != null) 
            if (Array.isArray(pData))
                for (const dataItem of pData)
                    this.push(dataItem);
    }       
}