/**
 * @module Test file
 * @description File testing of the application starts from
 * @version 0.0.1 (2021-02-17)
 */

global.srcDirectory = `${__dirname}/src`;
module.exports = global.include = function(pPath) { return require(global.srcDirectory + pPath); }

const Application = include("/application");

(() => {
    const argv = [ 
        "-s", "/home/Temp/Source", 
        "-d", "/home/Temp/Destination"
    ];
    global.application = new Application(argv);
    global.application.run();
})();