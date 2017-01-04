import Vue from "vue"
import signals from "signals"
import store from "app/store"
import throttle from "lodash/throttle"
import {mainLoaderDisappear} from "app/transitions/loader"
import preloader from 'preloader'
import Analytics from "foo/utils/Analytics"
import Requester from "foo/net/Requester"
import Facebook from "foo/net/api/Facebook"
import Google from "foo/net/api/Google"
import Xeerpa from "foo/net/api/Xeerpa"

import {LOADING, PROGRESS} from "app/store/modules/loader"
import {LOCALE_CHANGED, LOCALE_LOADING, STARTED} from "app/store/modules/app"


export default class AbstractApp {
    /**
     * @module foo
     * @namespace core
     * @class AbstractApp
     * @author Mendieta
     * @constructor
     * @param {object} config App config object
     * @param {object} environment App environment object
     * @param {object} [data={}] App initial load data
     */
    constructor(config, environment, data = {}) {

        /**
         * Signal dispatching on app animationFrame
         * @property rendered
         * @type {Signal}
         */
        this.rendered = new signals.Signal();

        /**
         * Signal dispatching on ap resize
         * @property resized
         * @type {Signal}
         */
        this.resized = new signals.Signal();

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
         */
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
         * The app window width
         * @property width
         * @type {Number}
         */
        this.width = window.innerWidth;

        /**
         * The app window height
         * @property height
         * @type {Number}
         */
        this.height = window.innerHeight;

        /**
         * The current locale
         * @default "es-MX"
         * @property locale
         * @type {string}
         */
        this.locale = config.locale;
        /**
         * Loader
         * @property loader
         * @type {preloader}
         */
        this.loader = preloader({
            xhrImages: false,
            loadFullAudio: true,
            loadFullVideo: true
        });
        this.setLocale = this.setLocale.bind(this);
        window.App = this;
        this._setupAnalytics();
    }

    /**
     * Method called when the App will initialize, setup initial data at override
     * @method init
     * @override
     */
    init() {
        if (this.DEBUG) this.startDebug();
        this._addListeners();
        this._initSDKs().then(() => {
            if (this.config.asset_loading) {
                Requester.getJSON("static/data/preload.json").then((response) => {
                    this.loadAssets(response.body);
                }).then(undefined, (error) => {
                    throw new Error("Unable to load preload.json file!");
                });

            } else {
                this.start();
            }
        });
    }

    /**
     * Method that init the Analytics helper
     * @protected
     * @override
     * @method _setupAnalytics
     * @returns {void}
     */
    _setupAnalytics() {
        this.analytics = new Analytics("static/data/tracking.json", this.config.analytics, this._setupPolyglot())
    }

    /**
     * Method that setups Polyglot, loads default locale
     * @private
     * @override
     * @method _setupPolyglot
     * @returns {void}
     */
    _setupPolyglot() {
        /**
         * the current locale
         * @default "es-MX"
         * @type {Array}
         */
        this.locales = [];
        window.locale = Vue.t;
        this.setLocale(this.locale);
    }

    /**
     * Method that loads the current locale and (re)renders the App
     * @private
     * @override
     * @method _loadLocale
     * @returns {void}
     */
    _loadLocale() {
        Requester.getJSON(`static/data/locale/${this.locale}.json`)
            .then((response) => {
                this.locales.push(this.locale);
                Vue.locale(this.locale, response.body);
                Vue.config.lang = this.locale;
                store.commit(LOCALE_CHANGED, this.locale);
                if (!this.started) {
                    this.init();
                }
            })
            .then(undefined, (error) => {
                console.error("Error: The provided locale was not found in the locales directory.", error);
            })
    }

    /**
     * Method that set the current locale
     * @method setLocale
     * @param {string} locale The locale to set as current
     * @returns {void}
     */
    setLocale(locale) {
        this.locale = locale;
        if (this.locales.includes(this.locale)) {
            Vue.config.lang = this.locale;
            store.commit(LOCALE_CHANGED, this.locale);
        } else {
            store.commit(LOCALE_LOADING);
            this._loadLocale();
        }
    }

    /**
     * Method that init listeners depending on the App config
     * @private
     * @method _addListeners
     * @returns {void}
     */
    _addListeners() {
        if (this.config.vars.resize) window.addEventListener("resize", throttle(this._onResizeHandler, 16));
        if (this.config.vars.animate) this._animate();
    }

    /**
     * Method that initialize SDKs and APIs depending on the App config
     * @private
     * @method _initSDKs
     * @returns {Promise}
     */
    _initSDKs() {
        return new Promise((resolve, reject) => {
            const {apis} = this.config;
            let count = 0;
            let loaded = 0;
            if (apis.facebook) {
                count++;
                Facebook.setup().then(() => {
                    defer();
                })
            }
            if (apis.google) {
                count++;
                Google.setup().then(() => {
                    defer();
                })
            }
            if (apis.twitter) {
                //TODO: Setup twitter api
            }
            if (apis.xeerpa) {
                count++;
                Xeerpa.setup().then(() => {
                    defer();
                })
            }
            let defer = () => {
                loaded++;
                if (loaded == count) {
                    resolve();
                }
            };
            if (count == 0) resolve();
        });
    }

    /**
     * Window resize event handler
     * @param {Event} e The event object
     * @protected
     * @method _onResizeHandler
     * @returns {void}
     */
    _onResizeHandler(e) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        App.resized.dispatch({width: this.width, height: this.height});
    }

    /**
     * Method that loops animation frameworks
     * @private
     * @method _animate
     * @returns {void}
     */
    _animate() {
        requestAnimationFrame(() => {
            App.rendered.dispatch();
            this._animate();
        });
    }

    /**
     * Method that starts debug mode, depending on App config and environment
     * @protected
     * @override
     * @method startDebug
     * @returns {void}
     */
    startDebug() {
    }

    /**
     * Method to load all assets
     * @private
     * @param assets
     * @method loadAssets
     * @return {void}
     */
    loadAssets(assets) {
        store.commit(LOADING, true);
        assets.map((item, i) => {
            this.loader.add(item);
        });
        this.loader.on("progress", this.loaderProgress.bind(this));
        this.loader.on("complete", this.loaderComplete.bind(this));
        this.loader.load();
    }

    /**
     * Starts App, override if needed custom initialization.
     * @override
     * @method start
     * @returns {void}
     */
    start() {
        this.started = true;
        this.renderApp();
        mainLoaderDisappear().then(() => {
            //TODO: Defer app rendering to loader out transition complete? ¿Maybe? Or defer first view animation?
        });
        store.commit(STARTED);
    }

    /**
     * Loader Progress
     * @override
     * @method loaderProgress
     * @returns {void}
     */
    loaderProgress(prog) {
        store.commit(PROGRESS, prog);
    }

    /**
     * Loader Complete
     * @override
     * @method loaderComplete
     * @returns {void}
     */
    loaderComplete() {
        store.commit(LOADING, false);
        this.start();
    }

    /**
     * Method to be overridden, render logic
     * @abstract
     * @override
     * @method renderApp
     * @returns {void}
     */
    renderApp() {

    }
}
