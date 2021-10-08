/**
 * @module "ArgTemplateFactory" class
 * @description Creates arg templates
 * @version 0.0.1 (2021-08-12)
 */

import { ArgName } from "../application/argName.js";
import { ArgTemplate } from "core-library";
import { ArgTemplateFactoryBase } from "core-library";
import { DataType } from "core-library";

export class ArgTemplateFactory extends ArgTemplateFactoryBase {
    static get argTemplates() { 
        const argTemplateArray = [
            new ArgTemplate(0, ArgName.directoryPath, "Path to a directory with Dynamics solution", DataType.string, true),
            new ArgTemplate([ "s", "settings" ], ArgName.settings, "Path to settings file", DataType.string),
            new ArgTemplate([ "d", "debug" ], ArgName.debug, "Defines debug mode (\"true\" or \"false\")", DataType.boolean),
            new ArgTemplate([ "dd", "debugDirectoryPath" ], ArgName.debugDirectoryPath, "Path where the application dumps debug information", DataType.string)
        ];
        let argTemplates = super.create();
        argTemplates.insert(argTemplateArray);
        return argTemplates;
    }
}