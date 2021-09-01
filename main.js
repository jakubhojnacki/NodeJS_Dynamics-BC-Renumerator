import Application from "./src/application.js";
import Node from "./src/general/node.js";

(() => {
    global.theRoot = Node.getRoot(import.meta);
    global.theApplication = new Application(process.argv);
    global.theApplication.run();
})();
