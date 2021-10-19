/**
 * @module "Application" class
 * @description Represents the main application class
 */

"use strict";

import { ArgName } from "../application/argName.mjs";
import { ArgTemplateFactory } from "../application/argTemplateFactory.mjs";
import { ConsoleApplication } from "console-library";
import { Logic } from "../logic/logic.mjs";
import { Messages } from "core-library";
import { Settings } from "../settings/settings.mjs";

export class Application extends ConsoleApplication {
    constructor(pRootDirectoryPath) {
        super(pRootDirectoryPath);
        this.argTemplates = (new ArgTemplateFactory()).create();
        this.settings = new Settings();
    }

    async runLogic() {
        const __this = this;
        const directoryPath = this.args.get(ArgName.directoryPath);
        const logic = new Logic(this, directoryPath);
        if (this.diagnostics.enabled) {
            logic.onDynamicsApplication = (lDynamicsApplication) => { __this.logic_onDynamicsApplication(lDynamicsApplication); };
            logic.onDynamicsWebService = (lDynamicsWebService) => { __this.logic_onDynamicsWebService(lDynamicsWebService); };
            logic.onDirectory = (lDirectoryEventInfo) => { __this.logic_onDirectory(lDirectoryEventInfo); };
            logic.onFile = (lFileEventInfo) => { __this.logic_onFile(lFileEventInfo); };
        } else
            logic.onProgress = (lProgress) => { __this.logic_onProgress(lProgress); }
        await logic.run(directoryPath);
        if (!this.diagnostics.enabled)
            this.console.newLine();
    }

    logic_onDynamicsApplication(pDynamicsApplication) {
        const messages = new Messages();
        pDynamicsApplication.log(this.diagnostics.enabled, messages);
        this.console.writeMessages(messages);
    }

    logic_onDynamicsWebService(pDynamicsWebService) {
        if (Array.isArray(pDynamicsWebService.dynamicsObjects)) {
            this.console.writeLine("Objects received from the web service:");
            for (const dynamicsObject of pDynamicsWebService.dynamicsObjects)
                this.console.writeLine(dynamicsObject.toString(), 1);
        }
    }

    logic_onDirectory(pDirectoryEventInfo) {
        this.console.writeLine(`[${pDirectoryEventInfo.name}]`, pDirectoryEventInfo.indentation); 
    }

    logic_onFile(pFileEventInfo) {
        if (pFileEventInfo.renumbered)
            this.console.writeLine(`${pFileEventInfo.name} ==> ${pFileEventInfo.renumberator.name}`, pFileEventInfo.indentation);
    }

    logic_onProgress(pProgress) {
        this.console.moveLeft(1000);
        this.console.clearLine();
        this.console.write(pProgress.toString("[", "#", "]", 20, this.console.width));
    }    
}
