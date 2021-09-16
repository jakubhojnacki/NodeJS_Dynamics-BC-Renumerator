/**
 * @module "Application" class
 * @description Represents the main application class
 * @version 0.0.1 (2021-07-27)
 */

import "./general/javaScript.js";
import Args from "./general/args.js";
import ArgName from "./args/argName.js";
import ArgTemplateFactory from "./args/argTemplateFactory.js";
import Engine from "./engine/engine.js";
import Logger from "./general/logger.js";
import Manifest from "./general/manifest.js";
import Settings from "./settings/settings.js";
import StringBuilder from "./general/stringBuilder.js";

export default class Application {
    static get manifest() { return new Manifest(); }

    get args() { return this.mArgs; }
    get settings() { return this.mSettings; }
    get logger() { return this.mLogger; }
    get debugMode() { return this.mDebugMode; }

    constructor(pArgValues) {
        this.mArgs = Args.parse(pArgValues, ArgTemplateFactory.argTemplates);
        this.mSettings = Settings.read(ArgName.settingsFilePath);
        this.mLogger = new Logger();
        this.mDebugMode = this.args.get(ArgName.debugMode, false);
    }

    async run() {
        try {
            if (this.initialise())
                await this.runEngine();
        } catch (tError) {
            const message = (tError ? (this.debugMode ? tError.stack : tError.message) : "Unknown error");
            this.logger.writeError(message);
        } finally {
            this.finalise();
        }
    }

    async runEngine() {
        const __this = this;
        const directoryPath = this.args.get(ArgName.directoryPath);
        const engine = new Engine(directoryPath, this.settings);
        engine.onDynamicsApp = (lDynamicsApp) => { __this.engine_onDynamicsApp(lDynamicsApp); };
        engine.onDirectory = (lDirectoryName, lIndentation) => { __this.engine_onDirectory(lDirectoryName, lIndentation); };
        engine.onFile = (lFileName, lRenumbered, lRenumberator, lIndentation) => { __this.engine_onFile(lFileName, lRenumbered, lRenumberator, lIndentation); };
        await engine.run(directoryPath, this.setings);
    }

    engine_onDynamicsApp(pDynamicsApp) {
        pDynamicsApp.log(0);
    }

    engine_onDirectory(pDirectoryName, pIndentation) {
        this.logger.writeLine(`[${pDirectoryName}]`, pIndentation); 
    }

    engine_onFile(pFileName, pRenumbered, pRenumberator, pIndentation) {
        const renumberedText = pRenumbered ? `renumbered by "${pRenumberator.name}"` : "not renumbered";
        this.logger.writeLine(`${pFileName} => ${renumberedText}`, pIndentation + 1);
    }

    initialise() {
        this.logger.writeLine(Application.manifest.toString());
        this.logger.writeSeparator();
        const result = this.args.validate();
        return result;
    }

    finalise() {
        this.logger.writeSeparator();
        this.logger.writeLine("Completed.");
    }
}
