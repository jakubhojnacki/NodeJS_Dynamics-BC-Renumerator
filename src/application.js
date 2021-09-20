/**
 * @module "Application" class
 * @description Represents the main application class
 * @version 0.0.1 (2021-07-27)
 */

import "./general/javaScript.js";
import Args from "./general/args.js";
import ArgName from "./args/argName.js";
import ArgTemplateFactory from "./args/argTemplateFactory.js";
import Debug from "./general/debug.js";
import Engine from "./engine/engine.js";
import Manifest from "./general/manifest.js";
import Settings from "./settings/settings.js";
import Terminal from "./general/terminal.js";

export default class Application {
    static get manifest() { return new Manifest(); }

    get args() { return this.mArgs; }
    get settings() { return this.mSettings; }
    get terminal() { return this.mTerminal; }
    get debug() { return this.mDebug; }

    constructor(pArgValues) {
        this.mArgs = Args.parse(pArgValues, ArgTemplateFactory.argTemplates);
        this.mSettings = Settings.read(ArgName.settingsFilePath);
        this.mTerminal = new Terminal();
        this.mDebug = new Debug(this.args.get(ArgName.debug, false), this.args.get(ArgName.debugDirectoryPath, ''));
    }

    async run() {
        try {
            if (this.initialise())
                await this.runEngine();
        } catch (tError) {
            const message = (tError ? (this.debug.enabled ? tError.stack : tError.message) : "Unknown error");
            this.terminal.writeError(message);
        } finally {
            this.finalise();
        }
    }

    async runEngine() {
        const __this = this;
        const directoryPath = this.args.get(ArgName.directoryPath);
        const engine = new Engine(directoryPath, this.settings);
        engine.onDynamicsApplication = (lDynamicsApplication) => { __this.engine_onDynamicsApplication(lDynamicsApplication); };
        engine.onDirectory = (lDirectoryName, lIndentation) => { __this.engine_onDirectory(lDirectoryName, lIndentation); };
        engine.onFile = (lFileName, lRenumbered, lRenumberator, lIndentation) => { __this.engine_onFile(lFileName, lRenumbered, lRenumberator, lIndentation); };
        await engine.run(directoryPath, this.setings);
    }

    engine_onDynamicsApplication(pDynamicsApplication) {
        pDynamicsApplication.log(0);
    }

    engine_onDirectory(pDirectoryName, pIndentation) {
        this.terminal.writeLine(`[${pDirectoryName}]`, pIndentation); 
    }

    engine_onFile(pFileName, pRenumbered, pRenumberator, pIndentation) {
        if ((pRenumbered) || (this.debug.enabled)) {
            const line = pRenumbered ? `${pRenumberator.code}: ${pFileName}` : pFileName;
            this.terminal.writeLine(line, pIndentation);
        }
    }

    initialise() {
        this.terminal.writeLine(Application.manifest.toString());
        this.terminal.writeSeparator();
        const result = this.args.validate();
        return result;
    }

    finalise() {
        this.terminal.writeSeparator();
        this.terminal.writeLine("Completed.");
    }
}
