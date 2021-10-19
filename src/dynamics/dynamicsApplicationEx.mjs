/**
 * @module "DynamicsApplicationEx" class
 * @description Represents Dynamics application (extension) extended for renumberator
 */

"use strict";

import { DynamicsApplication } from "dynamics-library";
import { DynamicsDependencies } from "dynamics-library";
import { DynamicsRanges } from "dynamics-library";
import { Guid } from "core-library";

export class DynamicsApplicationEx extends DynamicsApplication {
    get renumberedId() { return this.mRenumberedId; }
    set renumberedId(pValue) { this.mRenumberedId = Guid.validate(pValue); }

    constructor(pId, pName, pPublisher, pVersion, pDependencies, pRanges, pRenumberedId) {
        super(pId, pName, pPublisher, pVersion, pDependencies, pRanges);
        this.renumberedId = pRenumberedId;
    }

    renumber() {
        const renumberedDependencies = new DynamicsDependencies();
        if (this.dependencies)
            for (const dependency of this.dependencies) {
                const renumberedDependency = dependency.renumber();
                renumberedDependencies.push(renumberedDependency);
            }
        const renumberedRanges = new DynamicsRanges();
        if (this.ranges)
            for (const range of this.ranges) {
                const renumberedRange = range.renumber();
                renumberedRanges.push(renumberedRange);
            }
        const newId = Guid.isEmpty(this.renumberedId) ? this.id : this.renumberedId;
        return new DynamicsApplication(newId, this.name, this.publisher, this.version, renumberedDependencies, renumberedRanges);
    }
}
