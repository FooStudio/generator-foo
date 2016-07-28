import {LOCALE_CHANGED, LOCALE_LOADING, RESIZE, STARTED} from "foo/core/vuex/constants"

const module = {
    state    : {
        started       : false,
        locale        : "",
        locale_loading: false,
        size          : { width: window.innerWidth, height: window.innerHeight }
    },
    mutations: {
        [LOCALE_CHANGED]( state, locale ){
            state.locale         = locale;
            state.locale_loading = false;
        },
        [LOCALE_LOADING]( state ){
            state.locale_loading = true;
        },
        [RESIZE]( state, size ){
            state.size = size;
        },
        [STARTED]( state ){
            state.started = true;
        }
    }
}

export default module;
