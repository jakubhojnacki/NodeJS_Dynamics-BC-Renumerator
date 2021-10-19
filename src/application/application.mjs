/**
 * @module "Application" class
 * @description Represents the main application class
 */

"use strict";

import { ArgName } from "../application/argName.mjs";
import { ArgTemplateFactory } from "../application/argTemplateFactory.mjs";
import { ConsoleApplication } from "console-library";
import { ConsoleProgress } from "console-library";
import { Logic } from "../logic/logic.mjs";
import { Messages } from "core-library";
import { Settings } from "../settings/settings.mjs";

export class Application extends ConsoleApplication {
    get progress() { return this.mProgress; }
    set progress(pValue) { this.mProgress = pValue; }

    constructor(pRootDirectoryPath) {
        super(pRootDirectoryPath);
        this.argTemplates = (new ArgTemplateFactory()).create();
        this.settings = new Settings();
        this.progress = null;
    }

    async runLogic() {
        const __this = this;
        const directoryPath = this.args.get(ArgName.directoryPath);
        const logic = new Logic(this, directoryPath);
        if (this.diagnostics.enabled) {
            logic.onDynamicsApplication = (lDynamicsApplication) => { __this.logic_onDynamicsApplication(lDynamicsApplication); };
            logic.onDynamicsWebService = (lDynamicsWebService) => { __this.logic_onDynamicsWebService(lDynamicsWebService); };
            logic.onDirectory = (lDirectoryEventInfo) => { __this.logic_onDirectory(lDirectoryEventInfo); };
            logic.onFile = (lFileSystemItemInfo) => { __this.logic_onFile(lFileSystemItemInfo); };
            logic.onOther = (lFileSystemItem) => { __this.logic_onOther(lFileSystemItem); }
        }
        this.progress = new ConsoleProgress(null, null, (lProgress) => { __this.onProgress(lProgress); }, "[", "#", "]", 20, this.console.width);
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

    logic_onFile(pFileSystemItemInfo) {
        if (pFileSystemItemInfo.renumbered)
            this.console.writeLine(`${pFileSystemItemInfo.name} ==> ${pFileSystemItemInfo.renumberator.name}`, pFileSystemItemInfo.indentation);
        else
            this.console.writeLine(`${pFileSystemItemInfo.name} --> ignored`, pFileSystemItemInfo.indentation);
    }

    logic_onOther(pFileSystemItem) {
        this.console.writeLine(`<${pFileSystemItem.type}>::<${pFileSystemItem.name}> --> ignored`, pFileSystemItem.indentation);
    }

    onProgress(pProgress) {
        if (!this.diagnostics.enabled)
            pProgress.render(this.console);
    }    
}
