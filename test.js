/**
 * @module Test file
 * @description File testing of the application starts from
 * @version 0.0.1 (2021-02-17)
 */

global.__rootDir = __dirname;
global.__srcDir = `${__rootDir}/src`;
module.exports = (global.include = (lPath) => { return require(`${global.__srcDir}/${lPath}`); })

const Application = include("/application");

(() => {
    const argv = [ 
        "-f", "/home/Development/Node.js/DynamicsRenumberator/raw/Asset_nHanced-ID-Manager"
    ];
    global.application = new Application(argv);
    //global.application.run();
})();