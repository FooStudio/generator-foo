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

export function login () {
    return {
        type: LOGIN
    }
}

export function login_fail ( error ) {
    return {
        type : LOGIN_FAIL,
        error: error
    }
}

export function login_success ( data ) {
    return {
        type: LOGIN_SUCCESS,
        data: data
    }
}

export function register () {
    return {
        type: REGISTER
    }
}

export function register_fail () {
    return {
        type: REGISTER_FAIL
    }
}

export function register_success () {
    return {
        type: REGISTER_SUCCESS
    }
}

export function logout () {
    return {
        type: LOGOUT
    }
}

export function logout_fail () {
    return {
        type: LOGOUT_FAIL
    }
}

export function logout_success () {
    return {
        type: LOGOUT_SUCCESS
    }
}
