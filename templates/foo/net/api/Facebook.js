/**
 * Helper class for working with Facebook API
 */

import LoadJS from "foo/net/JSLoader"
import {LOGIN, LOGIN_FAIL, LOGIN_SUCCESS} from "app/constants/user"

export default class Facebook {

    /**
     * The Facebook SDK url
     * @property
     * @type {string}
     */
    url         = "//connect.facebook.net/en_US/all.js";
    /**
     * The Facebook permissions array
     * @property
     * @type {array}
     */
    premissions = "email";
    /**
     * The Facebook App ID
     * @property
     * @type {string}
     */
    appID       = "";
    /**
     * Flag determining if the SDK is loaded
     * @property
     * @type {boolean}
     */
    loaded      = false;
    /**
     * The User Data Object
     * @property
     * @type {Object}
     */
    userData    = null;

    /**
     *
     * @return {void}
     * @constructor
     */
    constructor () {
        this.permissions = App.config.facebook_permissions;
        this.appID       = App.environment.properties.fb;
        this.load();
    }

    /**
     * Load the SDK
     * @private
     * @return {void}
     */
    load () {
        LoadJS( this.url, this.init );
    }

    /**
     * Initialize the Facebook API
     * @private
     * @returns {void}
     */
    init () {
        if ( this.loaded ) return;
        this.loaded = true;
        FB.init( {
            appId  : this.appID,
            status : false,
            xbml   : false,
            version: "2.4"
        } );
    }

    /**
     * Facebook login method
     * @param {function} cb
     * @return {void}
     */
    login ( cb ) {
        if ( !this.loaded ) return;
        App.store.dispatch( { type: LOGIN } );
        FB.login( ( res )=> {
            if ( res[ "status" ] === "connected" ) {
                this._getUserData( cb, res[ "authResponse" ][ "accessToken" ] );
            } else {
                App.store.dispatch( { type: LOGIN_FAIL, error: "Access Denied" } );
                cb( new Error( "Access denied" ) );
            }
        }, this.permissions );
    }

    /**
     * Fetches user data and stores it in userData
     * @param {function} cb The callback
     * @param {string} token The facebook session token
     * @return {void}
     * @private
     */
    _getUserData ( cb, token ) {
        let count               = 0;
        let userData            = {};
        userData.access_token   = token;
        userData.social_network = "facebook";

        FB.api( "/me", ( res )=> {
            userData.full_name = res.name;
            userData.social_id = res.id;
            userData.email     = res.email || null;
            resolve();
        } );

        FB.api( "me/pictrure", { "width": "200" }, ( res )=> {
            userData.profile_pic = res.data.url;
            resolve();
        } );

        let resolve = ()=> {
            count++;
            if ( count === 2 ) {
                this.userData = userData;
                App.store.dispatch( { type: LOGIN_SUCCESS, data: userData } );
                cb( null, userData );
            }
        }
    }

    /**
     * Open Facebook share ui with options
     * @param {object} opts The options object
     * @param {function} cb The callback
     * @return {void}
     * @static
     */
    static share ( opts, cb = null ) {
        FB.ui( {
            method     : opts.method || "feed",
            name       : opts.name || "",
            link       : opts.link || "",
            picture    : opts.picture || "",
            caption    : opts.caption || "",
            description: opts.description || ""
        }, ( response )=> {
            if ( !cb ) return;
            cb( response );
        } );
    }

    /**
     * Get user Facebook friends
     * @param {function} cb The callback
     * @return {void}
     * @static
     */
    static getUserFriends ( cb ) {

    }

}
