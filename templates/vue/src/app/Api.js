/**
 * Created by mendieta on 7/15/16.
 */

import request from "superagent"
import store from "app/store"
import {login_fail, login_sucess, logout_fail, logout_success, register_fail, register_success} from "app/actions/user"

export default class Api {

    static login ( data ) {
        request
            .post( App.environment.urls.api + "user/login" )
            .set( "Content-Type", "application/json" )
            .set( "Accept", "application/json" )
            .send( data )
            .end( ( error, data )=> {
                if ( error ) login_fail( store, error )
                login_sucess( store, data.body )
            } );
    }

    static register ( data ) {
        request
            .post( App.environment.urls.api + "user/register" )
            .set( "Content-Type", "application/json" )
            .set( "Accept", "application/json" )
            .send( data )
            .end( ( error, data )=> {
                if ( error ) register_fail( store, error )
                register_success( store, data.body )
            } );
    }

    static logout ( data = null ) {
        request
            .post( App.environment.urls.api + "user/logout" )
            .set( "Content-Type", "application/json" )
            .set( "Accept", "application/json" )
            .send( data )
            .end( ( error, data )=> {
                if ( error ) logout_fail( store, error )
                logout_success( store )
            } );
    }
}
