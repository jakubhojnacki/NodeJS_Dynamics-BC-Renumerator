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
const ArgTemplates = include("/general/args/argTemplates");
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
        const __this = this;
        const argTemplates = new ArgTemplates([
            new ArgTemplate("f", ArgName.folderPath, DataType.string, true),
            new ArgTemplate("r", ArgName.range, DataType.string, true),
            new ArgTemplate("sp", ArgName.settingsFilePath, DataType.string, false),
            new ArgTemplate("b", ArgName.backupMode, DataType.string, false),
            new ArgTemplate("l", ArgName.logger, DataType.string, false),
            new ArgTemplate("lp", ArgName.loggerFilePath, DataType.string, (lArgs) => { return lArgs.get(ArgName.logger, false); })
        ]);
        return Args.parse(pArgV, argTemplates, (lArgTemplates, lArgs) => { __this.parseArgs_onError(lArgTemplates, lArgs); });
    }

    parseArgs_onError(pArgTemplates, pArgs) {
        const logger = LoggerFactory.create(LoggerType.console);
        pArgTemplates.log(logger, pArgs);
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
        const __this = this;
        this.logger.writeText("Renumbering:");
        const folderPath = this.args.get(ArgName.folderPath);
        const renumberator = new Renumberator(folderPath, (lDynamicsApp) => { __this.renumber_onDynamicsApp(lDynamicsApp); });
        renumberator.run();

    }

    renumber_onDynamicsApp(pDynamicsApp) {
        pDynamicsApp.log();
    }

    finalise() {
        this.logger.writeSeparator();
        this.logger.writeText("Completed");
        this.logger.dispose();
    }
}

module.exports = Application;