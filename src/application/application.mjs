/**
 * @module "Application" class
 * @description Represents the main application class
 */

import { ArgName } from "./argName.mjs";
import { ArgTemplateFactory } from "./argTemplateFactory.mjs";
import { ConsoleApplication } from "console-library";
import { Logic } from "./engine/logic.mjs";
import { Settings } from "./settings/settings.mjs";

export class Application extends ConsoleApplication {
    constructor(pRootDirectoryPath) {
        super(pRootDirectoryPath);
        this.argTemplates = ( new ArgTemplateFactory()).create();
        this.settings = ( new Settings()).read();
    }

    async runEngine() {
        const __this = this;
        const directoryPath = this.args.get(ArgName.directoryPath);
        const logic = new Logic(directoryPath, this.settings);
        if (this.diagnostics.enabled) {
            logic.onDynamicsApplication = (lDynamicsApplicationEventInfo) => { __this.engine_onDynamicsApplication(lDynamicsApplicationEventInfo); };
            logic.onDirectory = (lDirectoryEventInfo) => { __this.engine_onDirectory(lDirectoryEventInfo); };
            logic.onFile = (lFileEventInfo) => { __this.engine_onFile(lFileEventInfo); };
        } else
            logic.onProgress = (lProgress) => { __this.engine_onProgress(lProgress); }
        await logic.run(directoryPath);
        if (!this.diagnostics.enabled)
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
