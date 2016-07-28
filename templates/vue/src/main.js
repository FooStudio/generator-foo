//IMPORT APP STYLES
import "sanitize.css/sanitize.css"
import "./main.styl"

//IMPORT POLYFILLS
require( 'es6-promise' ).polyfill();

//IMPORT ANALYTICS ADAPTERS
import GoogleAnalytics from "foo/utils/tracking/GoogleAnalytics"

//IMPORT APP UTILS
import domready from "domready"
import Breakpoints from "foo/utils/Breakpoints"
import Requester from "foo/net/Requester"

//IMPORT APP CONFIG
import {config, environment} from "./config"

//STARTS APP
const startApp = ( data = null ) => {
    window.data = data;
    require.ensure( [], ()=> {
        //IMPORT TWEENMAX / CREATE / ETC
        require( "gsap" ).TweenMax

        //CREATE APP
        const App = require( "app/App" ).default;
        new App( config, environment, data );

    }, "app" );
};

//LOADS THE INITIAL APP DATA || STARTS THE APP
const loadData             = ()=> {
    //SETUP BREAKPOINTS
    Breakpoints.setup();

    //DO INITIAL DATA/ASSET LOADING || START APP
    if ( config.data_loading ) {
        console.info( "Foo:", "Load App Data" );
        Requester.getJSON( "static/data/data.json", ( error, data )=> { startApp( data.body ); } );
    } else {
        startApp();
    }
}
/**
 * LOADS THE ANALYTICS ADAPTER BASED ON CONFIG
 */
const loadAnalyticsAdapter = ()=> {
    switch ( config.analytics ) {
        case "google":
            GoogleAnalytics( environment.properties.ga );
            break;
        default:
    }
    loadData();
}

domready( function () {
    loadAnalyticsAdapter();
} );
