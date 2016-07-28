/**
 * Created by mendieta on 7/28/16.
 */

import Vue from "vue"
import store from "app/store"
import Requester from "foo/net/Requester"
import Analytics from "foo/core/vue/VueAnalitics"
import {locale_changed, locale_loading, resized, started} from "foo/core/vuex/actions"
import {progress} from "app/actions/loader"
import AbstractApp from "foo/core/AbstractApp"

export default class VueAbstractApp extends AbstractApp {

    constructor ( config, environment, data = {} ) {
        super( config, environment, data )
    }

    _setupAnalytics () {
        this.analytics = new Analytics( "static/data/tracking.json", this.config.analytics, this._setupPolyglot() )
    }

    _setupPolyglot () {
        /**
         * The current locale
         * @default "es-MX"
         * @type {Array}
         */
        this.locales = [];
        window.locale = Vue.t;
        this.setLocale( this.locale );
    }

    _loadLocale () {
        Requester.getJSON( "static/data/locale/" + this.locale + ".json", ( error, data )=> {
            if ( error ) {
                console.error( "Error: The provided locale was not found in the locales directory" );
            } else {
                this.locales.push( this.locale );
                Vue.locale( this.locale, data.body );
                Vue.config.lang = this.locale;
                locale_changed( store, this.locale );
                if ( !this.started ) {
                    this.init();
                }
            }
        } );
    }

    setLocale ( locale ) {
        this.locale = locale;
        if ( this.locales.includes( this.locale ) ) {
            Vue.config.lang = this.locale;
            locale_changed( store, this.locale );
        } else {
            locale_loading( store );
            this._loadLocale();
        }
    }

    _onResizeHandler ( e ) {
        super._onResizeHandler( e );
        resized( store, { width: this.width, height: this.height } )
    }

    start () {
        started( store );
        super.start();
    }

    loaderProgress ( prog ) {
        progress( store, prog )
    }

    loaderComplete () {
        super.loaderComplete();
    }
}
