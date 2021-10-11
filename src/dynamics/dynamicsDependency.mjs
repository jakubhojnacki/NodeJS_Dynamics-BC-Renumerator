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

    validate(pValidator, pTestRenumbered) {
        pValidator.setComponent(DynamicsDependency.name);
        super.validate(pValidator, pTestRenumbered);
        pValidator.restoreComponent();
    }   

    toData() {
        return super.toData();
    }
}
