/**
 * @module "RenumberatorFactory" class (static)
 * @description Creates renumberators
 */

import { DynamicsAlRenumberator } from "../dynamics/dynamicsAlRenumberator.js";
import { DynamicsManifestRenumberator } from "../dynamics/dynamicsManifestRenumberator.js";
import { DynamicsPermissionSetRenumberator } from "../dynamics/dynamicsPermissionSetRenumberator.js";

export class RenumberatorFactory {
    static create(pEngine) {
        return [
            new DynamicsManifestRenumberator(pEngine),
            new DynamicsAlRenumberator(pEngine),
            new DynamicsPermissionSetRenumberator(pEngine)
        ];
    }
}
