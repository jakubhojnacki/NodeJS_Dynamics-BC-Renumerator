/**
 * @module "DynamicsDependencies" class
 * @description Represents an array of dependencies
 */

export class DynamicsDependencies extends Array {
    get terminal() { return global.theApplication.terminal; }

    constructor() {        
        super();
    }

    log(pFull, pMessages, pIndentation) {
        const indentation = Number.validate(pIndentation);
        pMessages.addInformation("Dependencies:", indentation);
        for (const dynamicsDependency of this)
            pMessages.addInformation(dynamicsDependency.toString(), indentation + 1);
    }

    validate(pValidator, pTestRenumbered) {
        for (const dependency of this)
            dependency.validate(pValidator, pTestRenumbered);
    }   

    get(pId) {
        return this.find((lDynamicsDependency) => { return (lDynamicsDependency.id === pId); });
    }      

    toData() {
        let data = [];
        for (const dependency of this)
            data.push(dependency.toData());
        return data;
    }       
}
