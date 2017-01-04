/**
 * Created by mendieta on 10/23/16.
 */
import Vue from "vue"
import Vuex, {Store} from "vuex"

import app from "app/store/modules/app"
import loader from "app/store/modules/loader"
import user from "app/store/modules/user"

Vue.use(Vuex);

const state = {};

export default new Store({
    state,
    modules: {
        app,
        loader,
        user
    },
    plugins: []
});
