/**
 * @module "DynamicsDependencyEx" class
 * @description Represents a dependency of Dynamics application extended for renumberator
 */

"use strict";

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
        const newId = Guid.isEmpty(this.renumberedId) ? this.id : this.renumberedId;
        return new DynamicsDependency(newId, this.name, this.publisher, this.version);
    }    
}
