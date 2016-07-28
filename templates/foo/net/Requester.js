/**
 * Created by mendieta on 1/20/16.
 */
import request from "superagent"

/**
 * AJAX helper Class
 *
 * Uses Superagent as backend
 *
 * @example
 * Request.getJSON(http://fooprojects.com/api/user", onResponse);
 * Request.postJSON(http://fooprojects.com/api/user/add", {user:"foo", pass:"bar"}, onResponse);
 *
 * onResponse(err, data){
 *      if(err){
 *          console.error("Error loading data")
 *      }else{
 *          //data.body is the response data
 *          console.log(data.body);
 *      }
 * }
 */
export default class Requester {

    /**
     * Fetches a JSON with GET protocol
     * @param {string} url The url to be fetched
     * @param {function} cb The callback when the request finished or fails
     * @static
     * @return {void}
     */
    static getJSON ( url, cb ) {
        request
            .get( url )
            .set( "Accept", "application/json" )
            .end( cb );
    }

    /**
     * POST data to a url, fetches result
     * @param {string} url The url to post data to
     * @param {object} obj The Object to be posted
     * @param {function} cb The callback when the request finished or fails
     * @return {void}
     */
    static postJSON ( url, obj, cb ) {
        request
            .post( url )
            .set( "Content-Type", "application/json" )
            .set( "Accept", "application/json" )
            .send( obj )
            .end( cb );
    }
}
