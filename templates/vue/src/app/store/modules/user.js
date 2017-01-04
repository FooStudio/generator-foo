/**
 * Created by mendieta on 11/7/16.
 */

import AuthManager from "foo/core/AuthManager"

export const LOGIN = "user/login";
export const REGISTER = "user/register";
export const LOGOUT = "user/logout";
export const LOGGING_IN = "user/logging_in";

const state = {
    logged: false,
    logging: false,
    facebook: null,
    google: null,
    xeerpa: null,
    api: null
};

const actions = {
    [LOGIN]({commit}, payload){
        return new Promise((resolve, reject) => {
            commit(LOGGING_IN, true);
            AuthManager.login(payload.service, payload.data, payload.xs)
                .then((response) => {
                    commit(LOGIN, {network: payload.service, response});
                    resolve(response);
                    commit(LOGGING_IN, false);
                })
                .catch((error) => {
                    reject(error);
                    // console.error(error);
                    commit(LOGGING_IN, false);
                });
        });
    },
    [REGISTER]({commit}, payload){
        commit(REGISTER, payload);
    },
    [LOGOUT]({commit}, payload){
        commit(LOGOUT, payload);
    }
};

const mutations = {
    [LOGIN](state, payload){
        state.logged = true;
        state[payload.network] = payload.response;
    },
    [LOGGING_IN](state, payload){
        state.logging = payload;
    },
    [REGISTER](state, data){
        state.error = null;
        state.register_data = data;
    },
    [LOGOUT](state){
        state.error = null;
        //state.logged = false;
    }
};

const getters = {
    loggedIn: state => {
        return state.logged;
    }
};

export default {state, actions, mutations, getters};
