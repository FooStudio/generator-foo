var ora = require('ora');
var rfg = require('rfg-api').init();
var path = require('path');
var glob = require('glob');
var fs = require('fs');

var API_KEY = '92a0c9153f86a032479bdc681347fecad3e40a84';
var raw = "./static/"

function Favicon(favDesc, favData, dir) {
    this.description = favDesc;
    this.data = favData;
    this.favOutput = dir;
}

Favicon.prototype.generate = function (onFinish) {
    fs.readFile(this.description, onReadDescriptionFile.bind(this, onFinish));
}

Favicon.prototype.inject = function (filename) {
    fs.readFile(this.data, function (err, data) {
        if (err) console.log(err);
        var content = JSON.parse(data).favicon.html_code;
        fs.readFile(filename, function (err, markups) {
            if (err) console.log(err);
            rfg.injectFaviconMarkups(markups, content, null, function (err, finalContent) {
                fs.writeFile(filename, finalContent, function (err) {
                    if (err) console.log(err)
                })
            });
        });
    });
}

function onReadDescriptionFile(onFinish, err, desc) {
    if (err) console.log(err);
    var favicon = JSON.parse(desc);

    var opts = {
        apiKey: API_KEY,
        masterPicture: path.join(__dirname, favicon.masterPicture),
        iconsPath: favicon.iconsPath,
        design: favicon.design,
        settings: favicon.settings,
        versioning: favicon.versioning
    };

    var request = rfg.createRequest(opts);
    rfg.generateFavicon(request, this.favOutput, onGenerationComplete.bind(this, onFinish));
}

function onGenerationComplete(onFinish, err, result) {
    if (err) console.log(err);

    fs.writeFile(this.data, JSON.stringify(result), function (err) {
        if (err) console.log(err);
        onFinish();
    });
}

if (!module.parent) {
    //var config = require('../config');
    var spinner = ora('Generating favicons');
    spinner.start();

    var fav = new Favicon(path.join(__dirname, 'faviconDescription.json'), path.join(__dirname, 'faviconData.json'), path.join(raw, 'img/favicons'));

    fav.generate(function () {
        fav.inject(path.join("./src/", 'index.html'));
        fs.exists(path.join("./src/", 'main.php'), function (exists) {
            if (exists) fav.inject(path.join("./src/", 'main.php'));
        });
        fs.exists(path.join("./src/", 'unsupported.html'), function (exists) {
            if (exists) fav.inject(path.join("./src/", 'unsupported.html'));
        });

        spinner.text = "Favicons generated succesfully!";
        spinner.succeed();

    });
} else {
    module.exports = Favicon;
}
