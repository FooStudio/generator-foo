/**
 * Created by mendieta on 7/6/16.
 */

//BASE APP IMPORTS
import Vue from "vue"
import AbstractApp from "foo/core/vue/VueAbstractApp"
import store from "app/store"
import "app/animations"

//VUE PLUGINS IMPORTS
import VueI18n from "vue-i18n"
import VueFoo from "foo/core/vue/VueFoo"

//VUE ROUTER IMPORTS
import VueRouter from "vue-router"
import routes from "app/routes"
import {sync} from "foo/core/vue/router-sync"

//APP SPECIFIC IMPORTS
import Root from "app/views/Root.vue"

export default class App extends AbstractApp {

    constructor ( config, environment, data = {} ) {
        super( config, environment, data )
        Vue.use( VueI18n );
        Vue.use( VueFoo, { app: this } );
        Vue.use( VueRouter );
    }

    /**
     * CALLED JUST AFTER INITIAL DATA IS LOADED (LOCALE/SDKS/ETC)
     */
    init () {
        this.createRouter();
        super.init();
    }

    createRouter () {
        this.router = new VueRouter();
        this.router.map( routes );
        this.router.beforeEach( this.onBeforeTransition );
        this.router.afterEach( this.onAfterTransition );
        sync( store, this.router );
    }

    onBeforeTransition ( transition ) {
        transition.next();
    }

    onAfterTransition ( transition ) {
    }

    /**
     * CALLED JUST BEFORE THE RENDER METHOD
     */
    start () {
        //DO BEFORE START APP CONFIGURATION
        super.start();
    }

    renderApp () {
        this.router.start( Root, "#app" );
    }

}
