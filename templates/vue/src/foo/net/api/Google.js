import loadJS from "load-script";

/**
 * Helper static class for working with Google API
 * @class Google
 * @namespace net.apis
 * @author Mendieta
 */
export default class Google {
    /**
     * The Google SDK url;
     * @property url
     * @default "https://apis.google.com/js/client:plusone.js"
     * @static
     * @type {string}
     */
    static url = "https://apis.google.com/js/platform.js";

    /**
     * The default SDK params.
     * @property params
     * @static
     * @type {{clientid: null, callback: null, scope: string, cookiepolicy: string}}
     */
    static params = {
        "clientid": null,
        "callback": null,
        "scope": "https://www.googleapis.com/auth/plus.login",
        "cookiepolicy": "none"
    };

    /**
     * Variable determining if the SDK has been loaded.
     * @property loaded
     * @static
     * @type {boolean}
     */
    static loaded = false;

    /**
     * Variable determining if the SDK has been inited.
     * @property inited
     * @static
     * @type {boolean}
     */
    static inited = false;

    /**
     * The userData stored on static class.
     * @property userData
     * @static
     * @type {Object}
     */
    static userData = null;

    static resolve = null;

    /**
     * Setups the SDK
     * @method setup
     * @public
     * @static
     * @return {Promise}
     */
    static setup() {
        return new Promise((resolve) => {
            this.resolve = resolve;
            this._load();
        })
    }

    /**
     * Loads the SDK.
     * @method _load
     * @private
     * @static
     */
    static _load() {
        loadJS(this.url, this._init.bind(this));
    }

    static GoogleAuth = null;
    static GoogleUser = null;

    /**
     * Initialize the SDK.
     * @param {object} error The error that could occur loading the SDK.
     * @private
     * @static
     */
    static _init(error) {
        if (error) {
            throw new Error(`Google: Error loading SDK! - ${error}`);
        }
        if (this.loaded) return;
        gapi.load("auth2", () => {
            this.loaded = true;
            this.GoogleAuth = gapi.auth2.init({client_id: App.environment.properties.gp});
            this.GoogleAuth.then(() => {
                this.inited = true;
                this.resolve();
                this.resolve = null;
            })
        });
    }

    /**
     * Login method.
     * @method login
     * @public
     * @static
     */
    static login(resolve, reject) {
        if (!this.inited) throw new Error("Google SDK not loaded! call Google.setup() before login. You should enable the Google from the config file.");
        this.GoogleAuth.signIn()
            .then(() => {
                this.GoogleUser = this.GoogleAuth.currentUser.get();
                const prof = this.GoogleUser.getBasicProfile();
                const profile = {
                    id: prof.getId(),
                    name: prof.getName(),
                    given_name: prof.getGivenName(),
                    family_name: prof.getFamilyName(),
                    image_url: prof.getImageUrl(),
                    email: prof.getEmail()
                };
                const auth = this.GoogleUser.getAuthResponse();
                resolve({profile, auth});
            })
            .then(undefined, (error) => {
                console.error(error);
                reject(error);
            })
    }

    /**
     * The logout method.
     * @method logout
     * @public
     * @static
     */
    static logout(resolve, reject) {
        this.GoogleUser.disconnect();
        this.GoogleUser = null;
        resolve();
    }

}
