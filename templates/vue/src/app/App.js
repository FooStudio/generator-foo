/**
 * Created by mendieta on 11/7/16.
 */

//BASE APP IMPORTS
import Vue from "vue"
import Raven from "raven-js"
import AbstractApp from "foo/core/AbstractApp"
import store from "app/store"

//VUE PLUGINS
import RavenVue from "raven-js/plugins/vue"
import VueI18n from "vue-i18n"
import VueMediaQuery from "v-media-query"
import VueFoo from "foo/core/vue/VueFoo"

//VUE ROUTER
import VueRouter from "vue-router"
import routes from "app/routes"
import {sync} from "vuex-router-sync"

import Root from "app/Root.vue"

export default class App extends AbstractApp {
    constructor(config, environment, data = {}) {
        super(config, environment, data);

        if (environment.vars.sentry) {
            Raven
                .config("https://fd39b7be6a8e4bd8955a686d0b394bda@sentry.io/126339")
                .addPlugin(RavenVue, Vue)
                .install();
        }

        Vue.use(VueI18n);
        Vue.use(VueMediaQuery, {
            variables: {
                mobile: 600,
                desktop: 1280,
                hd: 1440
            }
        });
        Vue.use(VueFoo, {app: this});
        Vue.use(VueRouter);
    }

    /**
     * CALLED JUST BEFORE THE RENDER METHOD
     */
    start() {
        //DO BEFORE START APP CONFIGURATION/INITIALIZATION
        super.start();
    }

    renderApp() {
        routes.base = this.environment.vars.route;
        routes.mode = this.environment.vars.routerMode;
        let router = new VueRouter(routes);
        this.router = router;

        router.beforeEach((to, from, next) => {
            next();
        });

        sync(store, router);
        new Vue(Vue.util.extend({router, store}, Root)).$mount("#app");
    }
}
