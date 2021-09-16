/**
 * @module "ArgName" class
 * @description Class representing argument names
 * @version 0.0.3 (2021-08-10)
 */

export default class ArgName {
    static get directoryPath() { return "DirectoryPath"; }
    static get settings() { return "Settings"; }
    static get debugMode() { return "DebugMode"; }

    static get values() { return [
        ArgName.directoryPath,
        ArgName.settings,
        ArgName.debugMode
    ]; }

    static parse(pText) {
        return Enum.parse(pText, ArgName.values, ArgName.name);
    }
}
