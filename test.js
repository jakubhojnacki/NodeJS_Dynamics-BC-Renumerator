/**
 * @module Test file
 * @description File testing of the application starts from
 * @version 0.0.1 (2021-02-17)
 */

const Application = require("./src/application/application");

(() => {
    const argv = [ 
        "-f", `${__dirname}/../Dynamics Renumberator Raw/Test 1`,
        "-r", "SAAS",
        "-e", "linux",
        "-d", "true"
    ];
    global.application = new Application(argv);
    global.application.run();
})();