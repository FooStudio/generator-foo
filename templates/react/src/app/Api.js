/**
 * Created by mendieta on 7/28/16.
 */

import request from "superagent"
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from "app/constants/user"

export default class Api {

    static login ( data ) {
        request
            .post( App.environment.urls.api + "user/login" )
            .set( "Content-Type", "application/json" )
            .set( "Accept", "application/json" )
            .send( data )
            .end( ( error, data )=> {
                if ( error ) {
                    App.store.dispatch( { type: LOGIN_FAIL, error: error } );
                } else {
                    App.store.dispatch( { type: LOGIN_SUCCESS, data: data.body } );
                }
            } );
    }

    static register ( data ) {
        request
            .post( App.environment.urls.api + "user/register" )
            .set( "Content-Type", "application/json" )
            .set( "Accept", "application/json" )
            .send( data )
            .end( ( error, data )=> {
                if ( error ) {
                    App.store.dispatch( { type: REGISTER_FAIL, error: error } );
                } else {
                    App.store.dispatch( { type: REGISTER_SUCCESS, data: data.body } );
                }
            } );
    }

    static logout ( data = null ) {
        request
            .post( App.environment.urls.api + "user/logout" )
            .set( "Content-Type", "application/json" )
            .set( "Accept", "application/json" )
            .send( data )
            .end( ( error, data )=> {
                if ( error ) {
                    App.store.dispatch( { type: LOGOUT_FAIL, error: error } );
                } else {
                    App.store.dispatch( { type: LOGOUT_SUCCESS } );
                }
            } );
    }

}

