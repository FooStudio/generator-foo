/**
 * Created by mendieta on 1/3/17.
 */
require('shelljs/global');

var ora = require('ora');
var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config;
var env = process.argv[2];

switch (env) {
    case "production":
        config = require("../config/production.deploy.js");
        break;
    case "qa":
        config = require("../config/qa.deploy.js");
        break;
    default:
        config = require("../config/staging.deploy.js");
}

var spinner = ora('Uploading to FTP...')
spinner.color = "red";
spinner.start()

ftpDeploy.on("uploading", function (data) {
    spinner.text = "Uploading to FTP... " + data.percentComplete + "%";
});

ftpDeploy.deploy(config, function (error) {
    if (error) {
        spinner.text = "Error deploying: " + error.message;
        spinner.fail();
        process.exit(0);
    }
    else {
        spinner.text = "Finished Uploading!";
        spinner.succeed();
    }
});

