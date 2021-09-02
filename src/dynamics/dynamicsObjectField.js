/**
 * @module "DynamicsObjectField" class
 * @description Represents Dynamics object field (table field or enum value)
 * @version 0.0.1 (2021-02-22)
 */

import "../general/javaScript.js";
import DynamicsEntity from "./dynamicsEntity.js";

export default class DynamicsObjectField extends DynamicsEntity {
    get dataType() { return this.mDataType; }

    constructor(pId, pName, pDataType, pRenumberedId) {
        super(pId, pName, pRenumberedId);
        this.mDataType = String.validate(pDataType);
    }

    static deserialise(pData) {
        let dynamicsObjectField = null;
        if (pData != null)
            dynamicsObjectField = new DynamicsObjectField(pData.id, pData.name, pData.renumberedId);
        return dynamicsObjectField;
    }
}
