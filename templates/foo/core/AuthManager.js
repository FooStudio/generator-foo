/**
 * Created by mendieta on 7/28/16.
 */

import Facebook from "foo/net/api/Facebook"
import Google from "foo/net/api/Google"
import Api from "app/Api"

export default class AuthManager {
    static service = null;

    /**
     *
     * @param service
     * @param data
     */
    static login ( service, data = null ) {
        this.service = service;
        switch ( service ) {
            case "facebook":
                Facebook.login();
                break
            case "google":
                Google.login();
                break
            case "api":
                Api.login( data );
                break
            default:
                console.error( "AuthManager:", "Supplied service is not defined!" );
        }
    }

    static register ( data ) {
        Api.register( data );
    }

    static logout () {
        switch ( this.service ) {
            case "facebook":
                Facebook.logout();
                break
            case "google":
                Google.logout();
                break
            case "api":
                Api.logout();
                break
            default:
                console.error( "AuthManager:", "Supplied service is not defined!" );
        }
    }
}
