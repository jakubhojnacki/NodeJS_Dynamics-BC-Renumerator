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
        const folderPath = this.args.get(ArgName.folderPath);
        const engine = new Engine(folderPath, this.settings);
        engine.onDynamicsApp = (lDynamicsApp) => { __this.engine_onDynamicsApp(lDynamicsApp); };
        engine.onFolder = (lFolderName, lIndentation) => { __this.engine_onFolder(lFolderName, lIndentation); };
        engine.onFile = (lFileName, lRenumbered, lRenumberator, lIndentation) => { __this.engine_onFile(lFileName, lRenumbered, lRenumberator, lIndentation); };
        await engine.run(folderPath, this.setings);
    }

    engine_onDynamicsApp(pDynamicsApp) {
        pDynamicsApp.log(this.logger.tab);
    }

    engine_onFolder(pFolderName, pIndentation) {
        this.logger.writeLine(`[${pFolderName}]`, pIndentation); 
    }

    engine_onFile(pFileName, pRenumbered, pRenumberator, pIndentation) {
        const stringBuilder = new StringBuilder();
        stringBuilder.addNameValue("File", pFileName);
        if (pRenumbered)
            stringBuilder.addNameValue("Renumbered By", pRenumberator.name);
        this.logger.writeLine(stringBuilder.toString(), (pIndentation + 1) * this.logger.tab);
    }

    initialise() {
        this.logger.writeLine(Application.manifest.toString());
        this.logger.newLine();
        const result = this.args.validate();
        return result;
    }

    finalise() {
        this.logger.newLine();
        this.logger.writeLine("Completed.");
    }
}
