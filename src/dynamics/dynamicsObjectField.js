/**
 * @module "DynamicsObjectField" class
 * @description Represents Dynamics object field (table field or enum value)
 * @version 0.0.1 (2021-02-22)
 */

__require("general/javaScript");
const DynamicsEntity = __require("dynamics/dynamicsEntity");

class DynamicsObjectField extends DynamicsEntity {
    constructor(pId, pName, pRenumberedId) {
        super(pId, pName, pRenumberedId);
    }

    static deserialise(pData) {
        let dynamicsObjectField = null;
        if (pData != null)
            dynamicsObjectField = new DynamicsObjectField(pData.id, pData.name, pData.renumberedId);
        return dynamicsObjectField;
    }
}

module.exports = DynamicsObjectField;