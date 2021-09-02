/**
 * @module "ArgName" class
 * @description Class representing argument names
 * @version 0.0.3 (2021-08-10)
 */

export default class ArgName {
    static get folderPath() { return "FolderPath"; }
    static get settings() { return "Settings"; }
    static get debugMode() { return "DebugMode"; }

    static get values() { return [
        ArgName.folderPath,
        ArgName.settings,
        ArgName.debugMode
    ]; }

    static parse(pText) {
        return Enum.parse(pText, ArgName.values, ArgName.name);
    }
}
