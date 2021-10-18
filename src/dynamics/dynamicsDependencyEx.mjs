/**
 * @module "DynamicsDependencyEx" class
 * @description Represents a dependency of Dynamics application extended for renumberator
 */

import { DynamicsDependency } from "dynamics-library";
import { Guid } from "core-library";

export class DynamicsDependencyEx extends DynamicsDependency {
    get renumberedId() { return this.mRenumberedId; }
    set renumberedId(pValue) { this.mRenumberedId = Guid.validate(pValue); }

    constructor(pId, pName, pPublisher, pVersion, pRenumberedId) {
        super(pId, pName, pPublisher, pVersion);
        this.renumberedId = pRenumberedId;
    }

    renumber() {
        return new DynamicsDependency(this.renumberedId, this.name, this.pPublisher, this.version);
    }    
}
