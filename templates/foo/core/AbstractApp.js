/* eslint-disable */

/**
 * Created by mendieta on 1/20/16.
 */

import Dispatcher from "app/Dispatcher"
import {mainLoaderDisappear} from "app/animations/loader"
import preloader from 'preloader'
import Facebook from "foo/net/api/Facebook"
import Google from "foo/net/api/Google"

export default class AbstractApp {
    /**
     * @module foo
     * @namespace core
     * @class AbstractApp
     * @constructor
     * @param {object} config App config object
     * @param {object} environment App environment object
     * @param {object} [data={}] App initial load data
     * @param {object} store App Redux store
     */
    constructor ( config, environment, data = {} ) {
        /**
         * The app debug flasg
         * @property DEBUG
         * @type {boolean}
         */
        this.DEBUG = environment.vars.debug;

        /**
         * The app config object
         * @property config
         * @type {Object}
         */
        this.config = config;

        /**
         * The app analytics util
         * @property analytics
         * @type {Analytics}
         *
         this.analytics = null;

         /**
         * App environment object
         * @property environment
         * @type {Object}
         */
        this.environment = environment;

        /**
         * App initial load data
         * @default {}
         * @property data
         * @type {Object}
         */
        this.data = data;
        /**
         *  Defines if the App has started
         *  @property started
         *  @default false
         *  @type {boolean}
         */
        this.started = false;
        /**
         * The current locale
         * @default "es-MX"
         * @type {string}
         */
        this.locale = config.locale;
        /**
         * Loader
         * @default {}
         * @property data
         * @type {Object}
         */
        this.loader = preloader( {
            xhrImages    : false,
            loadFullAudio: true,
            loadFullVideo: true
        } );
        this.setLocale = this.setLocale.bind( this );
        window.App     = this;
        this._setupAnalytics();
    }

    /**
     * Method called when the App will initialize, setup initial data at override
     * @method init
     * @override
     */
    init () {
        if ( this.DEBUG ) this.startDebug();
        this._addListeners();
        this._initSDKs();
        if ( this.config.asset_loading ) {
            this.loader.on( 'progress', this.loaderProgress.bind( this ) );
            this.loader.on( 'complete', this.loaderComplete.bind( this ) );
            this.loadAssets();
        } else {
            this.start();
        }
    }

    /**
     * Method that init the Analytics helper
     * @protected
     * @override
     * @returns {void}
     */
    _setupAnalytics () {
    }

    /**
     * Method that setups Polyglot, loads default locale
     * @private
     * @override
     * @method _setupPolyglot
     * @returns {void}
     */
    _setupPolyglot () {
    }

    /**
     * Method that loads the current locale and (re)renders the App
     * @private
     * @override
     * @returns {void}
     */
    _loadLocale () {
    }

    /**
     * Method that set the current locale
     * @override
     * @param {string} locale The locale to set as current
     * @returns {void}
     */
    setLocale ( locale ) {
    }

    /**
     * Method that init listeners depending on the App config
     * @private
     * @returns {void}
     */
    _addListeners () {
        if ( this.config.vars.resize ) window.addEventListener( "resize", this._onResizeHandler );
        if ( this.config.vars.animate ) this._animate();
    }

    /**
     * Method that initialize SDKs and APIs depending on the App config
     * @private
     * @returns {void}
     */
    _initSDKs () {
        const { apis } = this.config;
        if ( apis.facebook ) {
            Facebook.setup();
        }
        if ( apis.google ) {
            Google.setup();
        }
        if ( apis.twitter ) {
            //SETUP TWITTER API
        }
    }

    /**
     * Window resize event handler
     * @param {Event} e The event object
     * @protected
     * @override
     * @returns {void}
     */
    _onResizeHandler ( e ) {
        /**
         * App window width
         * @type {Number}
         */
        this.width = window.innerWidth;
        /**
         * App window height
         * @type {Number}
         */
        this.height = window.innerHeight;
    }

    /**
     * Method that loops animation frameworks
     * @private
     * @returns {void}
     */
    _animate () {
        requestAnimationFrame( ()=> {
            // App.store.dispatch( rendered() );
            Dispatcher.RENDER.dispatch();
            this._animate();
        } );
    }

    /**
     * Method that starts debug mode, depending on App config and environment
     * @private
     * @returns {void}
     */
    startDebug () {
    }

    /**
     * Method to load all assets
     * @override
     * @return {void}
     */
    loadAssets () {
        this.data.global.map( ( item, i ) => {
            this.loader.add( '/static/' + item );
        } )
        this.loader.load();
    }

    /**
     * Starts App, override
     * @override
     * @returns {void}
     */
    start () {
        this.started = true;
        mainLoaderDisappear();
        this.renderApp();
    }

    /**
     * Loader Progress
     * @override
     * @returns {void}
     */
    loaderProgress ( prog ) {
    }

    /**
     * Loader Complete
     * @override
     * @returns {void}
     */
    loaderComplete () {
        console.info( 'Content Loaded' );
        this.start();
    }

    /**
     * Method to be overridden, render logic
     * @abstract
     * @override
     * @returns {void}
     */
    renderApp () {

    }
}
