/**
 * Created by mendieta on 11/4/16.
 */
export const LOADING = "loader/loading";
export const LOADED = "loader/loaded";
export const PROGRESS = "loader/progress";

const state = {
    loading: false,
    progress: 0
};

const actions = {
    [LOADING]({commit}, loading){
        commit(LOADING, loading);
    },
    [LOADED]({commit}){
        commit(LOADED);
    },
    [PROGRESS]({commit}, progress){
        commit(PROGRESS, progress);
    }
};

const mutations = {
    [LOADED](state){
        state.loading = false;
    },
    [LOADING](state, loading){
        state.loading = loading
    },
    [PROGRESS](state, progress){
        state.progress = progress;
    }
};

const getters = {
    loading: state => {
        return state.loading;
    },
    progress: state => {
        return state.progress;
    }
};

export default {state, actions, mutations, getters};
