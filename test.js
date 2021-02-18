/**
 * @module Test file
 * @description File testing of the application starts from
 * @version 0.0.1 (2021-02-17)
 */

const Application = require("./src/application");

(() => {
    const argv = [ 
        "-s", "/home/Temp/Source", 
        "-d", "/home/Temp/Destination"
    ];
    global.application = new Application(argv);
    global.application.run();
})();