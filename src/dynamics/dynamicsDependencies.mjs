/**
 * @module "DynamicsDependencies" class
 * @description Represents an array of dependencies
 */

export class DynamicsDependencies extends Array {
    get terminal() { return global.theApplication.terminal; }

    constructor() {        
        super();
    }

    //TODO - Review
    log(pIndentation) {
        const indentation = Number.validate(pIndentation);
        this.terminal.writeLine("Dependencies:", indentation);
        for (const dynamicsDependency of this)
            this.terminal.writeLine(dynamicsDependency.toString(), indentation + 1);
    }

    //TODO - Review
    validate(pValidator, pRaiseError, pWithRenumbered) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        for (const dependency of this)
            dependency.validate(pValidator, false, pWithRenumbered);
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }   

    get(pId) {
        return this.find((lDynamicsDependency) => { return (lDynamicsDependency.id === pId); });
    }      

    //TODO - Review
    serialise() {
        let data = [];
        for (const dependency of this)
            data.push(dependency.serialise());
        return data;
    }       
}
