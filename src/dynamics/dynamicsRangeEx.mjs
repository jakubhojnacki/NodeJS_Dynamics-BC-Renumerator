/**
 * @module "DynamicsRangeEx" class
 * @description Dynamics range extended for renumberator
 */

"use strict";

import { DynamicsRange } from "dynamics-library";

export class DynamicsRangeEx extends DynamicsRange {
    get renumberedFrom() { return this.mRenumberedFrom; }
    set renumberedFrom(pValue) { this.mRenumberedFrom = Number.validateAsInteger(pValue); }
    get renumberedTo() { return this.mRenumberedTo; }
    set renumberedTo(pValue) { this.mRenumberedTo = Number.validateAsInteger(pValue); }

    constructor(pFrom, pTo, pRenumberedFrom, pRenumberedTo) {
        super(pFrom, pTo);
        this.renumberedFrom = pRenumberedFrom;
        this.renumberedTo = pRenumberedTo;
    }

    renumber() {
        const renumbered = ((this.renumberedFrom > 0) && (this.renumberedTo > 0));
        const newFrom = renumbered ? this.renumberedFrom : this.from;
        const newTo = renumbered ? this.renumberedTo : this.to;
        return new DynamicsRangeEx(newFrom, newTo);
    }
}