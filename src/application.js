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
        const folder = this.args.get(ArgName.folder);
        const engine = new Engine(folder, this.settings);
        /*TODO - hook into events*/
        await engine.run();
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
