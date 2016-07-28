/**
 * Helper static class for working with Google API
 */

import LoadJS from "foo/net/JSLoader"
import store from "app/store"
import {login, login_fail, login_sucess} from "app/actions/user"

export default class Google {
    static url      = "https://apis.google.com/js/client:plusone.js";
    static params   = {
        "clientid"    : null,
        "callback"    : null,
        "scope"       : "https://www.googleapis.com/auth/userinfo.email",
        "cookiepolicy": "none"
    }
    static loaded   = false;
    static userData = null;

    static setup () {
        this.load();
    }

    static load () {
        LoadJS( this.url, this.init.bind( this ) );
    }

    static init () {
        if ( !this.loaded ) return;

        this.loaded               = true;
        this.params[ "clientid" ] = App.environment.properties.gp;
        this.params[ "callback" ] = this.onLoginCallback
    }

    static login () {
        if ( this.loaded ) {
            login( store );
            gapi.auth.signIn( this.params );
        } else {
            console.warn( "Google Plus:", "SDK not loaded" );
        }
    }

    static logout () {

    }

    static onLoginCallback ( res ) {
        if ( res[ "status" ][ "signed_in" ] ) {
            this.getUserData( res[ "access_token" ] );
        } else if ( res[ "error" ][ "access_denied" ] ) {
            login_fail( state, res[ "error" ] )
        }
    }

    static getUserData ( token ) {
        gapi.client.load( "plus", "v1", ()=> {
            let request = gapi.client.plus.people.get( { "userId": "me" } );
            request.execute( ( res )=> {
                let userData  = {
                    access_token  : token,
                    full_name     : res.displayName,
                    social_id     : res.id,
                    email         : res.emails[ 0 ] ? res.emails[ 0 ].value : false,
                    profile_pic   : res.image.url,
                    social_network: "google"
                }
                this.userData = userData;
                login_sucess( store, userData );
            } )
        } );
    }
}
