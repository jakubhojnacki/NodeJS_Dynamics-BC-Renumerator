/**
 * @module Test file
 * @description File testing of the application starts from
 * @version 0.0.1 (2021-02-17)
 */

global.__rootFolderPath = __dirname;
global.__srcFolderPath = `${__rootFolderPath}/src`;
module.exports = (global.__require = (lPath) => { return require(`${global.__srcFolderPath}/${lPath}`); })

const Application = __require("application");

(() => {
    // const argv = [ 
    //     "-f", "/home/Development/Node.js/Dynamics Renumberator Raw/Asset_nHanced-ID-Manager",
    //     "-r", "SAAS"
    // ];
    const argv = [ 
        "-f", `${__dirname}/../Dynamics Renumberator Raw/Test 1`,
        "-r", "SAAS",
        "-e", "linux",
        "-d", "true"
    ];
    global.application = new Application(argv);
    global.application.run();
})();