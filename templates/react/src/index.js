/**
 * Created by mendieta on 1/1/16.
 */
import "babel-polyfill";

import "sanitize.css/sanitize.css"
import "application.styl"

import GoogleAnalytics from "foo/utils/tracking/GoogleAnalytics"

import Breakpoint from "foo/utils/Breakpoint"
import Requester from "foo/net/Requester"
import {config, environment} from "app/config"

const startApp = ( data = null )=> {
    require.ensure( [], () => {
        // Import GSAP, Create.js, etc.
        require('gsap').TweenMax;

        // Import the App
        const App   = require( "app/App" ).default;

        // Create the app, third parameter is the data (if exists)
        const app = new App( config, environment, data ); // eslint-disable-line no-unused-vars
    }, "app" );
}

// Start the App
const loadData = ()=> {
    // Setup Breakpoints
    Breakpoint.setup();

    // Load assets / Start the App
    if ( config.data_loading ) {
        console.info( "Foo:", "Load App Data" );
        Requester.getJSON( "static/data/data.json", ( error, data )=> {
            startApp( data.body );
        } );
    } else {
        startApp();
    }
}

// Load the Analytics (based on config)
const loadAnalyticsAdapter = ()=> {
    switch ( config.analytics ) {
        case "google":
            GoogleAnalytics( environment.properties.ga );
            break;
        default:
    }
    loadData();
}

// Check if document is Ready, then start the flow
if ( document.readyState !== "complete" ) {
    document.addEventListener( "DOMContentLoaded", loadAnalyticsAdapter );
} else {
    loadAnalyticsAdapter();
}
