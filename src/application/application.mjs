/**
 * @module "Application" class
 * @description Represents the main application class
 */

import { ArgName } from "./argName.mjs";
import { ArgTemplateFactory } from "./argTemplateFactory.mjs";
import { ConsoleApplication } from "console-library";
import { Engine } from "./engine/engine.mjs";
import { Settings } from "./settings/settings.mjs";

export class Application extends ConsoleApplication {
    constructor(pRootDirectoryPath) {
        super(pRootDirectoryPath);
        this.argTemplates = ( new ArgTemplateFactory()).create();
        this.mSettings = ( new Settings()).read();
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
        if (this.debug.enabled) {
            engine.onDynamicsApplication = (lDynamicsApplicationEventInfo) => { __this.engine_onDynamicsApplication(lDynamicsApplicationEventInfo); };
            engine.onDirectory = (lDirectoryEventInfo) => { __this.engine_onDirectory(lDirectoryEventInfo); };
            engine.onFile = (lFileEventInfo) => { __this.engine_onFile(lFileEventInfo); };
        } else
            engine.onProgress = (lProgress) => { __this.engine_onProgress(lProgress); }
        await engine.run(directoryPath);
        if (!this.debug.enabled)
            this.terminal.newLine();
    }

    engine_onProgress(pProgress) {
        this.terminal.moveLeft(1000);
        this.terminal.clearLine();
        this.terminal.write(pProgress.toString("[", "#", "]", 20, this.terminal.width));
    }

    engine_onDynamicsApplication(pDynamicsApplicationEventInfo) {
        pDynamicsApplicationEventInfo.dynamicsApplication.log(pDynamicsApplicationEventInfo.indentation);
    }

    engine_onDirectory(pDirectoryEventInfo) {
        this.terminal.writeLine(`[${pDirectoryEventInfo.name}]`, pDirectoryEventInfo.indentation); 
    }

    engine_onFile(pFileEventInfo) {
        if (pFileEventInfo.renumbered)
            this.terminal.writeLine(`${pFileEventInfo.name} ==> ${pFileEventInfo.renumberator.name}`, pFileEventInfo.indentation);
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
