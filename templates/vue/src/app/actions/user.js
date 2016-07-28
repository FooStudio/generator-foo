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

export const login = ( { dispatch, state } ) => {
    dispatch( LOGIN );
}

export const login_fail = ( { dispatch, state }, error ) => {
    dispatch( LOGIN_FAIL, error );
}

export const login_sucess = ( { dispatch, state }, data ) => {
    dispatch( LOGIN_SUCCESS, data );
}

export const register = ( { dispatch, state }, data ) => {
    dispatch( REGISTER, data );
}

export const register_fail = ( { dispatch, state }, error ) => {
    dispatch( REGISTER_FAIL, error );
}

export const register_success = ( { dispatch, state }, data ) => {
    dispatch( REGISTER_SUCCESS, data );
}

export const logout = ( { dispatch, state } ) => {
    dispatch( LOGOUT );
}

export const logout_fail = ( { dispatch, state }, error ) => {
    dispatch( LOGOUT_FAIL, error );
}

export const logout_success = ( { dispatch, state } ) => {
    dispatch( LOGOUT_SUCCESS );
}
