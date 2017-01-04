/**
 * Created by mendieta on 10/23/16.
 */

export const LOCALE_CHANGED = "locale/changed";
export const LOCALE_LOADING = "locale/loading";
export const STARTED = "app/started";

const state = {
    started: false,
    locale: "",
    locale_loading: false
};

const actions = {};

const mutations = {
    [LOCALE_CHANGED](state, locale){
        state.locale = locale;
        state.locale_loading = false;
    },
    [LOCALE_LOADING](state){
        state.locale_loading = true;
    },
    [STARTED](state){
        state.started = true;
    }
};

const getters = {};

export default {state, actions, mutations, getters};
