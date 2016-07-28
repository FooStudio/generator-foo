/**
 * Created by mendieta on 7/14/16.
 */

import Vue from "vue"
import Vuex from "vuex"

//Make Vue aware of Vuex
Vue.use( Vuex );

//FOO MODULES
import app from "foo/core/vuex/mutations"

//APP SPECIFIC MODULES
import loader from "app/mutations/loader"
import user from "app/mutations/user"
import counter from "app/mutations/counter"

const state     = {
    data: window.data
};
const mutations = {};

//CREATE STORE
export default new Vuex.Store( {
    state,
    mutations,
    modules: {
        app,
        loader,
        user,
        counter
    },
    strict : process.env.NODE_ENV !== 'production'
} )

