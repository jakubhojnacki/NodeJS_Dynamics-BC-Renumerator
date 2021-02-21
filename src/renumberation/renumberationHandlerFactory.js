/**
 * @module "RenumberationHandlerFactory" class (static)
 * @description Creates renumberation handlers
 * @version 0.0.1 (2021-02-21)
 */

const DynamicsAlRenumberationHandler = __require("/renumberation/dynamicsAlRenumberationHandler");
const DynamicsAppManifestRenumberationHandler = __require("/renumberation/dynamicsAppManifestRenumberationHandler");
const DynamicsPermissionSetRenumberationHandler = __require("/renumberation/dynamicsPermissionSetRenumberationHandler");

__require("/general/javaScript");

/*static*/ class RenumberationHandlerFactory {
    static create() {
        return [
            new DynamicsAppManifestRenumberationHandler(),
            new DynamicsAlRenumberationHandler(),
            new DynamicsPermissionSetRenumberationHandler()
        ];
    }
}

module.exports = RenumberationHandlerFactory;