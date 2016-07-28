/* eslint-disable */

/**
 * Created by mendieta on 1/20/16.
 */

import React from "react"
import {render} from "react-dom"
import Polyglot from "node-polyglot"
import Requester from "foo/net/Requester"
import Analytics from "foo/utils/Analytics"
import Dispatcher from "app/Dispatcher"
import {locale_changed, locale_loading, resize, started} from "foo/core/redux/actions"
import {progress} from 'app/actions/loader'
import {mainLoaderDisappear} from "app/animations/loader"
import preloader from 'preloader'

export default class AbstractApp {

    static displayName = "AbstractApp";

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
    constructor ( config, environment, data = {}, store ) {
        /**
         * The App store
         * @property store
         * @type {Object}
         */
        this.store = store;

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
        this.locale = "es-MX";
        /**
         * Loader
         * @default {}
         * @property data
         * @type {Object}
         */
        this.loader = preloader({
            xhrImages: false,
            loadFullAudio: true,
            loadFullVideo: true
        });
        window.App = this;
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
        if (this.config.asset_loading) {
            this.loader.on('progress', this.loaderProgress);
            this.loader.on('complete', this.loaderComplete);
            this.loadAssets();
        } else {
            this.start();
        }
    }

    /**
     * Method that init the Analytics helper
     * @private
     * @returns {void}
     */
    _setupAnalytics () {
        this.analytics = new Analytics( "static/data/tracking.json", this.config.analytics, this._setupPolyglot() )
    }

    /**
     * Method that setups Polyglot, loads default locale
     * @private
     * @method _setupPolyglot
     * @returns {void}
     */
    _setupPolyglot () {
        /**
         * Polyglot instance
         * @private
         * @type {Polyglot}
         */
        this._polyglot = new Polyglot();
        window.locale = this._polyglot;
        window.$t     = ( key, options )=> {
            return this._polyglot.t( key, options );
        };
        this._polyglot.locale( this.config.locale );
        this._loadLocale();
    }

    /**
     * Method that loads the current locale and (re)renders the App
     * @private
     * @returns {void}
     */
    _loadLocale () {
        Requester.getJSON( "static/data/locale/" + this._polyglot.locale() + ".json", ( error, data )=> {
            if ( error ) {
                console.log( error );
                console.error( "Error: The provided locale was not found in the locales directory" );
            } else {
                this._polyglot.extend( data.body );
                App.store.dispatch( locale_changed( this._polyglot.locale(), data.body ) )
                if ( !this.started ) {
                    this.init();
                }
            }
        } );
    }

    /**
     * Method that set the current locale
     * @param {string} locale The locale to set as current
     * @returns {void}
     */
    setLocale ( locale ) {
        App.store.dispatch( locale_loading() )
        this._polyglot.locale( locale );
        this._loadLocale();
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
            console.log( "init facebook" );
        }
    }

    /**
     * Window resize event handler
     * @param {Event} e The event object
     * @private
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
        App.store.dispatch( resize( this.width, this.height ) );
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
     * @return {void
     */
    loadAssets () {
        this.data.global.map((item, i) => {
            this.loader.add('/static/' + item);
        })
        this.loader.load();
    }

    /**
     * Starts App, override
     * @override
     * @returns {void}
     */
    start () {
        this.started = true;
        App.store.dispatch( started() );
        mainLoaderDisappear();
        this.renderApp();
    }

    /**
     * Loader Progress
     * @override
     * @returns {void}
     */
    loaderProgress = (prog) => {
        App.store.dispatch( progress(prog) );
    }


    /**
     * Loader Complete
     * @override
     * @returns {void}
     */
    loaderComplete = () =>{
        console.info('Content Loaded');
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
