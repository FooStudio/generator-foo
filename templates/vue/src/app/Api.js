import Requester from "foo/net/Requester";

/**
 * @class Api
 * @author Mendieta
 */
export default class Api {


    /**
     * Login user
     * @method
     * @static
     * @param {Object} data
     */
    static login(data) {
        return new Promise((resolve, reject) => {
            Requester.postJSON(this.apiURL("login"), data).then((response) => {
                console.log("Login API success!");
                resolve(response.body);
            }).then(undefined, (error) => {
                console.log("Login API error!");
                reject(error);
            });
        })
    }

    /**
     * Log out the user
     * @method
     * @static
     * @return Promise
     */
    static logout() {
        return new Promise((resolve, reject) => {
            Requester.postJSON(this.apiURL("logout"), data).then((response) => {
                console.log("Login API success!");
                resolve(response.body);
            }).then(undefined, (error) => {
                console.log("Login API error!");
                reject(error);
            });
        })
    }

    /**
     * Register a new user
     * @param {object} data
     * @method
     * @static
     * @return Promise
     */
    static register(data) {
        return new Promise((resolve, reject) => {
            Requester.postJSON(this.apiURL("register"), data).then((response) => {
                console.log("Register API success.");
                resolve(response.body);
            }).then(undefined, (error) => {
                console.error("Register API error!");
                reject(error);
            })
        });
    }


    static apiURL(endpoint) {
        return `${App.environment.urls.api}${endpoint}`
    }
}
