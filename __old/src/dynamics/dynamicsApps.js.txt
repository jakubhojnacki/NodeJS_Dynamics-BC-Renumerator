/**
 * @module "DynamicsApps" class
 * @description Represents an array of Dynamics apps
 * @version 0.0.1 (2021-02-23)
 */

require("../general/javaScript");

const DynamicsApp = require("./dynamicsApp");

class DynamicsApps extends Array {
    constructor() {        
        super();
    }

    static deserialise(pData) {
        let dynamicsApps = new DynamicsApps();
        if (pData != null)
            for (const data of pData)
                dynamicsApps.push(DynamicsApp.deserialise(data));
        return dynamicsApps;
    }      

    get(pId) {
        return this.find((lApp) => { return (lApp.id === pId); });
    }   
}

module.exports = DynamicsApps;