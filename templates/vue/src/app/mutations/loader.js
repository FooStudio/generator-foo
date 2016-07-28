import {LOADED, LOADING, PROGRESS} from "app/constants/loader"

const module = {
    state    : {
        loading : false,
        progress: 0
    },
    mutations: {
        [LOADED]( state ){
            state.loading = false
        },
        [LOADING ]( state, loading ){
            state.loading = loading
        },
        [PROGRESS ]( state, progress ){
            state.progress = progress
        }
    }
}

export default module;
