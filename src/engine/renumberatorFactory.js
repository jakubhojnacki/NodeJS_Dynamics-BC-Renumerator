/**
 * @module "RenumberatorFactory" class (static)
 * @description Creates renumberators
 * @version 0.0.1 (2021-02-21)
 */

import "../general/javaScript.js";
import DynamicsAlRenumberator from "../dynamics/dynamicsAlRenumberator.js";
import DynamicsAppManifestRenumberator from "../dynamics/dynamicsAppManifestRenumberator.js";
import DynamicsPermissionSetRenumberator from "../dynamics/dynamicsPermissionSetRenumberator.js";

export default class RenumberatorFactory {
    static create(pEngine) {
        return [
            new DynamicsAppManifestRenumberator(pEngine),
            new DynamicsAlRenumberator(pEngine),
            new DynamicsPermissionSetRenumberator(pEngine)
        ];
    }
}
