/**
 * Helper static class for working with Facebook API
 */

import LoadJS from "foo/net/JSLoader"
import store from "app/store"
import {login, login_fail, login_sucess} from "app/actions/user"

export default class Facebook {

    /**
     * The Facebook SDK url
     * @property
     * @type {string}
     */
    static url         = "//connect.facebook.net/en_US/all.js";
    /**
     * The Facebook permissions array
     * @property
     * @type {array}
     */
    static premissions = "email";
    /**
     * The Facebook App ID
     * @property
     * @type {string}
     */
    static appID       = "";
    /**
     * Flag determining if the SDK is loaded
     * @property
     * @type {boolean}
     */
    static loaded      = false;
    /**
     * The User Data Object
     * @property
     * @type {Object}
     */
    static userData    = null;

    /**
     *
     */
    static setup () {
        this.permissions = App.config.facebook_permissions;
        this.appID       = App.environment.properties.fb;
        this.load();
    }

    /**
     * Load the SDK
     * @private
     * @return {void}
     */
    static load () {
        LoadJS( this.url, this.init.bind(this) );
    }

    /**
     * Initialize the Facebook API
     * @private
     * @returns {void}
     */
    static init () {
        if ( !this.loaded ) return;
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
     * @return {void}
     */
    static login () {
        if ( !this.loaded ) return;
        login( state );
        FB.login( ( res )=> {
            if ( res[ "status" ] === "connected" ) {
                this._getUserData( res[ "authResponse" ][ "accessToken" ] );
            } else {
                login_fail( store, new Error( "Access Denied" ) );
            }
        }, this.permissions );
    }

    static logout () {

    }

    /**
     * Fetches user data and stores it in userData
     * @param {function} cb The callback
     * @param {string} token The facebook session token
     * @return {void}
     * @private
     */
    static _getUserData ( token ) {
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
                login_sucess( state, userData );
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
