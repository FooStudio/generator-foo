/* eslint-disable no-unused-vars*/

/**
 * Created by mendieta on 7/13/16.
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

const initialState = {
    logged        : false,
    error         : null,
    access_token  : null,
    full_name     : null,
    social_id     : null,
    email         : null,
    profile_pic   : null,
    social_network: null
}

export default function update ( state = initialState, action ) {
    switch ( action.type ) {
        case LOGIN:
            break
        case LOGIN_FAIL:
            return { ...state, error: action.error }
        case LOGIN_SUCCESS:
            return Object.assign( {}, state, { logged: true }, action.data )
    }
    return state
}
