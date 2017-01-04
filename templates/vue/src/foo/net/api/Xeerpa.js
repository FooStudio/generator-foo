import bowser from "bowser"
import {LOGIN} from "app/store/modules/user"
import store from "app/store"

/**
 * Xeerpa social login helper class.
 * @author Mendieta
 * @class Xeerpa
 * @namespace net.api
 */
export default class Xeerpa {
    /**
     * Facebook static string ID
     * @default "FB"
     * @property FB
     * @static
     * @type {string}
     */
    static FB = "FB";
    /**
     * LinkedIn static string ID
     * @default "LI"
     * @property LI
     * @static
     * @type {string}
     */
    static LI = "LI";
    /**
     * Twitter static string ID
     * @default "TW"
     * @property TW
     * @static
     * @type {string}
     */
    static TW = "TW";
    /**
     * Google static string ID
     * @default "IG"
     * @property GO
     * @static
     * @type {string}
     */
    static GO = "GO";
    /**
     * Instagram static string ID
     * @default "IG"
     * @property IG
     * @static
     * @type {string}
     */
    static IG = "IG";

    /**
     * @default "WL"
     * @property WL
     * @type {string}
     * @static
     */
    static WL = "WL";

    /**
     * Callback to be called after Xeerpa response.
     * @property cb
     * @default null
     * @type {function}
     */
    static cb = null;

    static save = false;

    static setup() {
        return new Promise((resolve) => {
            if (!App.config.xeerpa_presist) return;
            const data = JSON.parse(window.sessionStorage.getItem("xeerpa"));
            if (data) {
                const expireDate = new Date(data.auth.expires);
                store.commit(LOGIN, {network: "xeerpa", response: data});
            }
            resolve();
        });
    }


    /**
     * Initiates a login to a social network with Xeerpa.
     * @param {string} sn The social network string ID.
     * @param {Object} [data=null] The extra data to be sent, optional.
     * @param {function} resolve
     * @param {function} reject
     * @param {boolean} save
     * @method login
     */
    static login(sn, data = {}, resolve, reject, save = false) {
        this.cb = resolve;
        this.save = save;
        const url = App.environment.properties.xeerpa;
        const apiURL = `${url}?socialNetwork=${sn}&data=${data}`;

        window.addEventListener("message", this._messageHandler.bind(this), false);

        window.open(apiURL, "Login", "width=" + (500) + ", height=" + (475) + ", scrollbars=yes");

        if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/)) || bowser.msie) {
            let checkCookie = setInterval(function () {
                let cookie = this._readCookie();
                if (cookie) {
                    clearInterval(checkCookie);
                    this._receiveData(cookie)
                }
            }, 100);
        }

        //TODO: DUE TO HOW XEERPA WORKS NO CANCEL OR ERROR CALLBACK IS TRIGGERED. MAYBE USING A TIMEOUT TO VERIFY USER ACTIVITY.
    }

    /**
     * Event handler for window message events.
     * @param {Event} event The event to be handled.
     * @private
     * @method _messageHandler
     */
    static _messageHandler(event) {
        if (typeof event.data != "string") return;
        let data = JSON.parse(event.data);
        if (data.socialNetwork) this._receiveData(data);
    }

    /**
     * Reads the cookie stored, and returns the value when appropriate.
     * @returns {Object} The user object data
     * @private
     * @method _readCookie
     */
    static _readCookie() {
        if (!document.cookie) return;
        let cookies = document.cookie.split(";");
        for (let i = 0; cookies.length; i++) {
            let cookie = cookies[i].split("=");
            if (cookie[0] === "user") {
                let value = cookie[1];
                document.cookie = "user=;path=/;expires=" + new Date(Date.now() - 1000).toGMTString();
                return value
            }
        }
    }

    /**
     * Process the data sent from Xeerpa and calls callback.
     * @param {Object} data The object to be processed.
     * @private
     * @method _receiveData
     */
    static _receiveData(data) {
        //TODO: Conditionally remove listener, IE doesn't use it.
        window.removeEventListener("message", this._messageHandler);
        this.cb(data);
        if (App.config.xeerpa_presist) window.sessionStorage.setItem("xeerpa", JSON.stringify(data));
    }

}
