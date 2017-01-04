/*!
 * Foo (Studio)
 */


//IMPORT GLOBAL CSS
import "sanitize.css/sanitize.css"
import "./main.styl"

//IMPORT MODERNIZR
import Modernizr from "modernizr"

//IMPORT POLYFILLS
require('es6-promise').polyfill();

//IMPORT ANALYTICS ADAPTERS
import {load as LoadGA} from "foo/utils/tracking/GoogleAnalytics"

//IMPORT APP UTILS
import domready from "domready"
import Breakpoints from "foo/utils/Breakpoint"
import Requester from "foo/net/Requester"

//IMPORT APP CONFIG
import {config, environment} from "./config"
import Acknowledgements from "foo/utils/Acknowledgments"

/**
 *
 * @param {Object} data
 */
const startApp = (data = null) => {
    require.ensure([], () => {
        //IMPORT TWEENMAX/CREATE/THREE/PLUGINS/ETC
        require("gsap").TweenMax;

        //CREATE APP
        if (environment.vars.debug) console.info("Foo: Start App");
        const App = require("app/App").default;
        new App(config, environment, data);
    }, "bundle")
};

/**
 * Load the initial App data || Starts the app
 */
const loadData = () => {
    //SETUP CSS BREAKPOINTS AND BROWSER MEDIA QUERIES
    Breakpoints.setup();

    //DO INITIAL DATA/ASSET LOADING || START APP
    if (config.data_loading) {
        if (environment.vars.debug) console.info("Foo: Load App Data");
        Requester.getJSON("static/data/data.json").then((response) => {
            startApp(response.body)
        }).then(undefined, (error) => {
            throw new Error(`Foo start error: ${error}`)
        })
    } else {
        startApp();
    }
};

/**
 * Load the analytics adapters based on config
 */
const loadAnalyticsAdapters = () => {
    for (let adapter of config.analytics) {
        switch (adapter) {
            case "google":
                LoadGA(environment.properties.ga);
                break;
            default:
                console.warn(`Foo: no analytics adapter for ${adapter}`);
                break;
        }
    }
    loadData();
};

domready(() => {
    Acknowledgements.show();
    loadAnalyticsAdapters();
});
