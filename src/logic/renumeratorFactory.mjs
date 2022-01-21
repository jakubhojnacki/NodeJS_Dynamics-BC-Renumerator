/**
 * @module "RenumeratorFactory" class (static)
 * @description Creates renumerators
 */

"use strict";

import { DynamicsAlRenumerator } from "../dynamicsRenumerators/dynamicsAlRenumerator.mjs";
import { DynamicsManifestRenumerator } from "../dynamicsRenumerators/dynamicsManifestRenumerator.mjs";
import { DynamicsPermissionSetRenumerator } from "../dynamicsRenumerators/dynamicsPermissionSetRenumerator.mjs";

export class RenumeratorFactory {
    static create(pEngine) {
        return [
            new DynamicsManifestRenumerator(pEngine),
            new DynamicsAlRenumerator(pEngine),
            new DynamicsPermissionSetRenumerator(pEngine)
        ];
    }
}
