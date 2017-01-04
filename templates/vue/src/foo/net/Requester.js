import request from "superagent";

/**
 * AJAX helper Class
 *
 * Uses Superagent as backend
 *
 *
 *      Request.getJSON(http://fooprojects.com/api/user").then(onResponse).catch();
 *      Request.postJSON(http://fooprojects.com/api/user/add", {user:"foo", pass:"bar"}).then(onResponse).catch();
 *
 *      onResponse(response){
 *              if(err){
 *                  console.error("Error loading data")
 *              }else{
 *                  //response.data is the response data
 *                  console.log(response.data);
 *              }
 *      }
 * @class Requester
 * @namespace net
 * @author Mendieta
 */
export default class Requester {
    /**
     * Fetches a JSON with GET protocol
     * @param {string} url The url to be fetched
     * @static
     * @return {Promise}
     * @method getJSON
     */
    static getJSON(url) {
        return request.get(url);
    }

    /**
     * POST data to a url, fetches result
     * @param {string} url The url to post data to
     * @param {object} data The Object to be posted
     * @return {Promise}
     * @method postJSON
     * @static
     */
    static postJSON(url, data) {
        return request.post(url)
            .send(data)
    }
}
