/**
 * @module "Application" class
 * @description Main class of the application
 * @version 0.0.1 (2021-02-17)
 */

include("/general/javaScript");

const ApplicationInformation = include("/applicationInformation");
const ArgName = include("/general/args/argName");
const Args = include("/general/args/args");
const ArgTemplate = include("/general/args/argTemplate");
const DataType = include("/general/dataType");
const LoggerFactory = include("/general/logging/loggerFactory");
const LoggerType = include("/general/logging/loggerType");
const Renumberator = include("/renumbering/renumberator");
const Settings = include("/settings/settings");

class Application {
    static get information() { return new ApplicationInformation(
        "Dynamics Renumberator",
        "Renumerates Dynamics 365 Business Central objects",
        "2.0.0",
        "The 365 People (Jakub Hojnacki)",
        "February 2021"
    ); }

    get args() { return this.mArgs; }
    get settings() { return this.mSettings; }
    get logger() { return this.mLogger; }

    constructor(pArgV) {
        this.mArgs = this.parseArgs(pArgV);
        this.mSettings = this.readSettings();
        this.mLogger = this.createLogger();            
    }

    parseArgs(pArgV) {
        const templates = [
            new ArgTemplate("c", ArgName.leaveComments, DataType.boolean),
            new ArgTemplate("d", ArgName.destinationFolderPath, DataType.string),
            new ArgTemplate("l", ArgName.logger, DataType.string),
            new ArgTemplate("lp", ArgName.loggerFilePath, DataType.string),
            new ArgTemplate("r", ArgName.range, DataType.string),
            new ArgTemplate("s", ArgName.sourceFolderPath, DataType.string),
            new ArgTemplate("sp", ArgName.settingsFilePath, DataType.string)
        ];
        return Args.parse(pArgV, templates);
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
        this.renumber();
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

    renumber() {
        this.logger.writeText("Renumbering:");
        const sourceFolderPath = this.args.get(ArgName.sourceFolderPath);
        const destinationFolderPath = this.args.get(ArgName.destinationFolderPath);
        const renumberator = new Renumberator(sourceFolderPath, destinationFolderPath);
        renumberator.run();
    }

    finalise() {
        this.logger.writeSeparator();
        this.logger.writeText("Completed");
        this.logger.dispose();
    }
}

module.exports = Application;