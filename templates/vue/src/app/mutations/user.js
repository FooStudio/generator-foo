/**
 * Created by mendieta on 7/15/16.
 */

import {
    LOGIN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from "app/constants/user"

const module = {
    state    : {
        logged        : false,
        register_data : null,
        error         : null,
        access_token  : null,
        full_name     : null,
        social_id     : null,
        email         : null,
        profile_pic   : null,
        social_network: null
    },
    mutations: {
        [LOGIN]( state ){
            state.error = null;
        },
        [LOGIN_FAIL]( state, error ){
            state.error = error
        },
        [LOGIN_SUCCESS ]( state, data ){
            state.logged = true;
            state        = Object.assign( {}, state, data )
        },
        [REGISTER]( state, data ){
            state.error         = null;
            state.register_data = data;
        },
        [REGISTER_FAIL ]( state, error ){
            state.error = error;
        },
        [REGISTER_SUCCESS ]( state, data ){
            state.logged = true;
            state        = Object.assign( {}, state, data )
        },
        [LOGOUT]( state ){
            //TODO: LOGOUT LOGIC
        },
        [LOGOUT_FAIL ]( state, error ){
            state.error = error;
        },
        [LOGOUT_SUCCESS ]( state ){
            state.logged = false;
        }
    }
}

export default module;
