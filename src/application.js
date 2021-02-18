/**
 * @module "Application" class
 * @description Main class of the application
 * @version 0.0.1 (2021-02-17)
 */

const ApplicationInformation = require("./applicationInformation");
const ArgName = require("./argName");
const Args = require("./args");
const ArgTemplate = require("./argTemplate");
const DataType = require("./dataType");
const LoggerFactory = require("./loggerFactory");
const LoggerType = require("./loggerType");
const Settings = require("./settings");

require("./javaScript");

class Application {
    static get information() { return new ApplicationInformation(
        "Dynamics Renumberator",
        "Renumerates Dynamics 365 Business Central objects",
        "2.0.0",
        "The 365 People (Jakub Hojnacki)",
        "February 2021"
    ); }
    static get argTemplates() { return [
        new ArgTemplate("c", ArgName.leaveComments, DataType.boolean),
        new ArgTemplate("d", ArgName.destinationFolderPath, DataType.string),
        new ArgTemplate("l", ArgName.logger, DataType.string),
        new ArgTemplate("lp", ArgName.loggerFilePath, DataType.string),
        new ArgTemplate("r", ArgName.range, DataType.string),
        new ArgTemplate("s", ArgName.sourceFolderPath, DataType.string),
        new ArgTemplate("sp", ArgName.settingsFilePath, DataType.string)
    ]};

    get args() { return this.mArgs; }
    get settings() { return this.mSettings; }
    get logger() { return this.mLogger; }

    constructor(pArgV) {
        this.mArgs = Args.parse(pArgV, Application.argTemplates);
        this.mSettings = this.readSettings();
        this.mLogger = this.createLogger();            
    }

    readSettings() {
        const settingsFilePath = this.args.get(ArgName.settingsFilePath, `${__dirname}/../settings.json`);
        return Settings.read(settingsFilePath);
    }

    createLogger() {
        const loggerType = this.args.get(ArgName.loggerType, LoggerType.console);
        const loggerFilePath = this.args.get(ArgName.loggerFilePath, "");
        return LoggerFactory.create(loggerType, loggerFilePath);
    }

    run() {
        this.initialise();
        this.finalise();
    }

    initialise() {
        this.logger.writeText(Application.information.toString());
        this.logger.writeSeparator();
        this.args.log();
        this.logger.writeSeparator();
        this.settings.log();
        this.logger.writeSeparator();
    }

    finalise() {
        this.logger.writeSeparator();
        this.logger.dispose();
    }
}

module.exports = Application;