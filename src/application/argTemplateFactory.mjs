/**
 * @module "ArgTemplateFactory" class
 * @description Creates arg templates
 * @version 0.0.1 (2021-08-12)
 */

"use strict";

import { ArgName } from "../application/argName.mjs";
import { ArgTemplate } from "core-library";
import { ArgTemplateFactoryBase } from "core-library";
import { DataType } from "core-library";

export class ArgTemplateFactory extends ArgTemplateFactoryBase {
    create() { 
        let argTemplates = super.create();
        argTemplates.insert([
            new ArgTemplate(0, ArgName.directoryPath, "Path to a directory with Dynamics solution", DataType.string, true)
        ]);
        return argTemplates;
    }
}