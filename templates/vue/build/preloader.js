/**
 * Created by mendieta on 1/4/17.
 */

var ora = require('ora');
var fs = require("graceful-fs");
var glob = require("glob");
var path = require("path");
var junk = require('junk');
var data = require("../config/config_preloader.json");

var ASSET_PATH = "static/"
var raw = "./static/"


function getPreloadList(cb) {

    var spinner = ora('Generating preloader');
    spinner.start();

    var assets = [];
    var count = 0;

    var done = function (err, files) {
        assets = assets.concat(files);
        count++;
        if (count >= data.length) {
            assets = assets.map(function (cur) {
                return (junk.not(path.basename(cur))) ? path.join(ASSET_PATH, path.normalize(cur).replace(path.normalize(raw), '')) : undefined;
            }).filter(Boolean);
            if (cb) {
                cb(assets);
            } else {
                fs.writeFile(path.join(raw, 'data/preload.json'), JSON.stringify(assets, null, 2), function (err, data) {
                    if (err){
                        spinner.color = "red";
                        spinner.text = "Cannot write preloader.json";
                        spinner.fail();
                    }else{
                        spinner.text = "Succesfully wrote preloader.json";
                        spinner.succeed();
                    }
                });
            }
        }
    };

    data.forEach(function (cur) {
        cur = path.join(raw, cur);
        if (glob.hasMagic(cur)) {
            glob(cur, {dot: false, nodir: true}, done);
        } else {
            done(undefined, path.join(raw, cur));
        }
    });
}

if (!module.parent) {
    getPreloadList();
} else {
    module.exports = getPreloadList;
}
