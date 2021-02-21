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

    static get argTemplates() {
        return new ArgTemplates([
            new ArgTemplate("f", ArgName.folderPath, "Path of the folder to process", DataType.string, true),
            new ArgTemplate("r", ArgName.range, "Range code to use for new objects", DataType.string, true),
            new ArgTemplate("sp", ArgName.settingsFilePath, "Path of application settings file", DataType.string, false),
            new ArgTemplate("b", ArgName.backupMode, "Application backup mode (\"none\", \"line\" or \"file\")", DataType.string, false),
            new ArgTemplate("l", ArgName.logger, "Type of logger used (\"console\" or \"file\")", DataType.string, false),
            new ArgTemplate("lp", ArgName.loggerFilePath, "File path for logger (if required)", DataType.string, (lArgs) => { return lArgs.get(ArgName.logger, false); })
        ]);        
    }

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
        if (this.validate())
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

    validate() {
        let result = true;
        const __this = this;
        if (!this.args.validate(Application.argTemplates, (lArgTemplates, lArgs) => { lArgTemplates.log(lArgs); }))
            result = false;
        return result;
    }

    parseArgs_onError(pArgTemplates, pArgs) {
        const logger = LoggerFactory.create(LoggerType.console);
        pArgTemplates.log(logger, pArgs);
        throw new Error("Arguments passed to the application are invalid.");
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