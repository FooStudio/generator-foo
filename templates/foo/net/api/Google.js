/**
 * Helper class for working with Google API
 */

import LoadJS from "foo/net/JSLoader"

export default class Google {
    url      = "https://apis.google.com/js/client:plusone.js";
    params   = {
        "clientid"    : null,
        "callback"    : null,
        "scope"       : "https://www.googleapis.com/auth/userinfo.email",
        "cookiepolicy": "none"
    }
    loaded   = false;
    callback = null;
    userData = null;

    constructor () {
        this.load();
    }

    load () {
        LoadJS( url, this.init );
    }

    init () {
        if ( this.loaded ) return;

        this.loaded               = true;
        this.params[ "clientid" ] = App.environment.properties.gb;
        this.params[ "callback" ] = this.onLoginCallback
    }

    login ( callback ) {
        if ( this.loaded ) {
            gapi.auth.signIn( this.params );
        } else {
            console.warn( "Google Plus:", "SDK not loaded" );
        }
    }

    onLoginCallback ( res ) {
        if ( res[ "status" ][ "signed_in" ] ) {
            this.getUserData( res[ "access_token" ] );
        } else if ( res[ "error" ][ "access_denied" ] ) {
            if ( this.callback ) this.callback( res[ "error" ] );
            console.warn( "Google Plus:", "Access denied" );
        }
    }

    getUserData ( token ) {
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
                this.callback( null, userData );
            } )
        } );
    }
}
