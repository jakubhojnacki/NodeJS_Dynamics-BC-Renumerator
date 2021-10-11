/**
 * @module "RenumberatorFactory" class (static)
 * @description Creates renumberators
 */

import { DynamicsAlRenumberator } from "../dynamicsRenumberators/dynamicsAlRenumberator.mjs";
import { DynamicsManifestRenumberator } from "../dynamicsRenumberators/dynamicsManifestRenumberator.mjs";
import { DynamicsPermissionSetRenumberator } from "../dynamicsRenumberators/dynamicsPermissionSetRenumberator.mjs";

export class RenumberatorFactory {
    static create(pEngine) {
        return [
            new DynamicsManifestRenumberator(pEngine),
            new DynamicsAlRenumberator(pEngine),
            new DynamicsPermissionSetRenumberator(pEngine)
        ];
    }
}
