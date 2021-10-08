/**
 * @module "DynamicsDependency" class
 * @description Represents a dependency of Dynamics application
 */

import { DynamicsApplicationBase } from "../dynamics/dynamicsApplicationBase.mjs";

export class DynamicsDependency extends DynamicsApplicationBase {
    constructor(pId, pName, pPublisher, pVersion, pRenumberedId) {
        super(pId, pName, pPublisher, pVersion, pRenumberedId);
    }

    toString() {
        return super.toStringBuilder().toString();
    }

    //TODO - Review
    validate(pValidator, pRaiseError, pWithRenumbered) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        super.validate(DynamicsDependency.name, validator, pWithRenumbered);
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }   

    //TODO - Review
    serialise() {
        return super.serialise();
    }
}
