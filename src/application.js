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
            if (!this.debug.enabled)
                this.terminal.newLine();
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
        engine.onDynamicsApplication = (lDynamicsApplicationEventInfo) => { __this.engine_onDynamicsApplication(lDynamicsApplicationEventInfo); };
        if (this.debug.enabled) {
            engine.onDirectory = (lDirectoryEventInfo) => { __this.engine_onDirectory(lDirectoryEventInfo); };
            engine.onFile = (lFileEventInfo) => { __this.engine_onFile(lFileEventInfo); };
        } else
            engine.onProgress = (lProgress) => { __this.engine_onProgress(lProgress); }
        await engine.run(directoryPath, this.setings);
        if (!this.debug.enabled)
            this.terminal.newLine();
    }

    engine_onProgress(pProgress) {
        this.terminal.moveLeft(1000);
        this.terminal.clearLine();
        this.terminal.write(pProgress.toString('[', '#', ']', 20));
    }

    engine_onDynamicsApplication(pDynamicsApplicationEventInfo) {
        if (this.debug.enabled)
            pDynamicsApplicationEventInfo.dynamicsApplication.log(pDynamicsApplicationEventInfo.indentation);
        else
            this.terminal.writeLine(pDynamicsApplicationEventInfo.dynamicsApplication.toString(), pDynamicsApplicationEventInfo.indentation);
    }

    engine_onDirectory(pDirectoryEventInfo) {
        this.terminal.writeLine(`[${pDirectoryEventInfo.name}]`, pDirectoryEventInfo.indentation); 
    }

    engine_onFile(pFileEventInfo) {
        if (pFileEventInfo.renumbered)
            this.terminal.writeLine(`${pFileEventInfo.name} ==> ${pFileEventInfo.renumberator.code}`, pFileEventInfo.indentation);
    }

    initialise() {
        this.terminal.writeLine(Application.manifest.toString());
        const result = this.args.validate();
        return result;
    }

    finalise() {
        if (this.debug.enabled)
            this.terminal.writeLine("Completed.");
    }
}
