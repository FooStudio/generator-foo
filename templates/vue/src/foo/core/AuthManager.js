import Facebook from "foo/net/api/Facebook"
import Google from "foo/net/api/Google"
import Xeerpa from "foo/net/api/Xeerpa"
import Api from "app/Api"

/**
 * Authentication manager class.
 * @class AuthManager
 * @namespace core
 * @author Mendieta
 */
export default class AuthManager {

    /**
     * Services struct.
     * @property services
     * @default {XE:string,FB: string, GO: string, API: string}
     * @type {Object}
     */
    static services = {
        XE: "xeerpa",
        FB: "facebook",
        GO: "google",
        API: "api",
    };

    /**
     * Login into the requested service.
     * @param {string} service The service to use for login
     * @param {object} [data=null] The user login data
     * @param {string} [xs="FB"] The Xeerpa social network ID to login into.
     * @static
     * @method login
     * @return {Promise}
     */
    static login(service, data = null, xs = "FB") {
        return new Promise((resolve, reject) => {
            switch (service) {
                case AuthManager.services.FB:
                    Facebook.login(resolve, reject);
                    break;
                case AuthManager.services.GO:
                    Google.login(resolve, reject);
                    break;
                case AuthManager.services.XE:
                    Xeerpa.login(xs, data, resolve, reject);
                    break;
                case AuthManager.services.API:
                    Api.login(data);
                    break;
                default:
                    throw new Error("AuthManager:", `Supplied service: ${service} is not defined!`);
                    reject("Error");
            }
        });
    }

    /**
     * Calls a register method on the APi endpoint.
     * @method register
     * @static
     * @param {string} service The service to be used for register action.
     * @param {Object} data The data to be sent to the register method.
     */
    static register(service, data) {
        return new Promise((resolve, reject) => {
            switch (service) {
                case this.services.API:
                    Api.register(data);
                    break;
                default:
                    throw new Error("AuthManager:", `Supplied service: ${service} is not defined for the register action!`);
                    reject("Error");
            }
        });
    }

    /**
     * Logs out the user.
     * @method logout
     * @static
     * @return Promise
     */
    static logout() {
        return Api.logout();
    }
}
