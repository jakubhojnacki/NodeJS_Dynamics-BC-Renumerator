/**
 * @module "DynamicsDependency" class
 * @description Represents a dependency of Dynamics application
 * @version 0.0.1 (2021-02-20)
 */

import "../general/javaScript.js";
import DynamicsApplicationBase from "./dynamicsApplicationBase.js";

export default class DynamicsDependency extends DynamicsApplicationBase {
    constructor(pId, pName, pPublisher, pVersion, pRenumberedId) {
        super(pId, pName, pPublisher, pVersion, pRenumberedId);
    }

    inject(pData) {
        if ("id" in pData)
            pData.id = this.renumberedId;
        else
            pData.appId = this.renumberedId;
    }

    toString() {
        return super.toStringBuilder().toString();
    }

    validate(pValidator, pRaiseError, pWithRenumbered) {
        const validator = pValidator ? pValidator : new Validator();
        const raiseError = Boolean.validate(pRaiseError);
        super.validate(DynamicsDependency.name, validator, pWithRenumbered);
        if (raiseError)
            validator.raiseErrorIfNotSuccess();
        return validator;
    }   
}
