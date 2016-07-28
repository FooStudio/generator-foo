/**
 * Created by mendieta on 1/1/16.
 */

import React from "react"
import {render} from "react-dom"
import {Provider} from "react-redux"
import configureStore from "app/store"
import {syncHistoryWithStore} from "react-router-redux"

//REACT ROUTER
import {Router, useRouterHistory} from "react-router"
import {createHashHistory} from "history"
import routes from "app/Routes"

import AbstractApp from "foo/core/react/ReactAbstractApp"

export default class App extends AbstractApp {

    constructor ( config, environment, data = {} ) {
        const store = configureStore();
        super( config, environment, data, store );
    }

    // Called just after inital data is loaded (locale/sdks/etc).
    init () {
        const appHistory = useRouterHistory( createHashHistory )( { queryKey: false, hashType: 'hashbang'} )
        this.history     = syncHistoryWithStore( appHistory, this.store )
        super.init();
    }

    // Called just before the render method.
    start () {
        super.start();
    }

    renderApp () {
        render(
            <Provider store={this.store}>
                <Router history={this.history} routes={routes}/>
            </Provider>, document.getElementById( "root" ) )
    }
}
