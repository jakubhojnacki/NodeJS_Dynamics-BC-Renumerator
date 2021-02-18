/**
 * @module "ArgName" class (static)
 * @description Class representing argument names
 * @version 0.0.1 (2021-02-17)
 */

/*static*/ class ArgName {
    static get destinationFolderPath() { return "DestinationFolderPath"; }
    static get leaveComments() { return "LeaveComments"; }
    static get logger() { return "Logger"; }
    static get loggerFilePath() { return "LoggerFilePath"; }
    static get range() { return "Range"; }
    static get settingsFilePath() { return "SettingsFilePath"; }
    static get sourceFolderPath() { return "SourceFolderPath"; }
}

module.exports = ArgName;