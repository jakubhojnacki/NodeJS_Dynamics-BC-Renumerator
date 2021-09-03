/**
 * @module "RenumberatorFactory" class (static)
 * @description Creates renumberators
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import DynamicsAlRenumberator from "../dynamics/dynamicsAlRenumberator.js";
import DynamicsManifestRenumberator from "../dynamics/dynamicsManifestRenumberator.js";
import DynamicsPermissionSetRenumberator from "../dynamics/dynamicsPermissionSetRenumberator.js";

export default class RenumberatorFactory {
    static create(pEngine) {
        return [
            new DynamicsManifestRenumberator(pEngine),
            new DynamicsAlRenumberator(pEngine),
            new DynamicsPermissionSetRenumberator(pEngine)
        ];
    }
}
