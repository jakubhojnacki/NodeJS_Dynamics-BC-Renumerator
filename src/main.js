import Application from "./application.js";
import Node from "./general/node.js";

(() => {
    global.theRoot = Node.getRoot(import.meta, true);
    global.theApplication = new Application(process.argv);
    global.theApplication.run();
})();
