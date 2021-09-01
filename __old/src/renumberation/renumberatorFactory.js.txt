/**
 * @module "RenumberatorFactory" class (static)
 * @description Creates renumberators
 * @version 0.0.1 (2021-02-21)
 */

require("../general/javaScript");

const DynamicsAlRenumberator = require("./dynamicsAlRenumberator");
const DynamicsAppManifestRenumberator = require("./dynamicsAppManifestRenumberator");
const DynamicsPermissionSetRenumberator = require("./dynamicsPermissionSetRenumberator");

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