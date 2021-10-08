/**
 * @module "DynamicsApplications" class
 * @description Represents an array of Dynamics apps
 */

export class DynamicsApplications extends Array {
    constructor() {        
        super();
    }

    get(pId) {
        return this.find((lDynamicsApplication) => { return (lDynamicsApplication.id === pId); });
    }   
}
