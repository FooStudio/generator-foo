/**
 * Created by mendieta on 7/28/16.
 */

import AbstractApp from "foo/core/AbstractApp"
import Requester from "foo/net/Requester"
import Polyglot from "node-polyglot"
import {locale_changed, locale_loading, resize, started} from "foo/core/redux/actions"
import {progress} from 'app/actions/loader'
import Analytics from "foo/core/react/ReactAnalytics"

export default class ReactAbstractApp extends AbstractApp {

    constructor ( config, environment, data = {}, store ) {
        super( config, environment, data );
        this.store = store;
    }

    _setupAnalytics () {
        this.analytics = new Analytics( "static/data/tracking.json", this.config.analytics, this._setupPolyglot() )
    }

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

    setLocale ( locale ) {
        App.store.dispatch( locale_loading() )
        this._polyglot.locale( locale );
        this._loadLocale();
    }

    _onResizeHandler ( e ) {
        super._onResizeHandler( e );
        App.store.dispatch( resize( this.width, this.height ) );
    }

    start () {
        App.store.dispatch( started() );
        super.start();
    }

    loaderProgress ( prog ) {
        App.store.dispatch( progress( prog ) );
    }

    loaderComplete () {
        super.loaderComplete();
    }
}
