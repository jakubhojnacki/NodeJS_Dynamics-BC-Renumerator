/**
 * @module "RenumberatorFactory" class (static)
 * @description Creates renumberators
 * @version 0.0.1 (2021-02-21)
 */

__require("general/javaScript");
const DynamicsAlRenumberator = __require("renumberation/dynamicsAlRenumberator");
const DynamicsAppManifestRenumberator = __require("renumberation/dynamicsAppManifestRenumberator");
const DynamicsPermissionSetRenumberator = __require("renumberation/dynamicsPermissionSetRenumberator");

/*static*/ class RenumberatorFactory {
    static create(pRenumberation) {
        return [
            new DynamicsAppManifestRenumberator(pRenumberation),
            new DynamicsAlRenumberator(pRenumberation),
            new DynamicsPermissionSetRenumberator(pRenumberation)
        ];
    }
}

module.exports = RenumberatorFactory;