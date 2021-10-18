/**
 * @module "DynamicsApplicationEx" class
 * @description Represents Dynamics application (extension) extended for renumberator
 */

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
            for (const dependency in this.dependencies) {
                const renumberedDependency = dependency.renumber();
                renumberedDependencies.push(renumberedDependency);
            }
        const renumberedRanges = new DynamicsRanges();
        if (this.ranges)
            for (const range in this.ranges) {
                const renumberedRange = range.renumber();
                renumberedRanges.push(renumberedRange);
            }
        return new DynamicsApplication(this.renumberedId, this.name, this.pPublisher, this.version, renumberedDependencies, renumberedRanges);
    }
}
