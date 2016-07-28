/**
 * Created by mendieta on 7/13/16.
 */
import Root from "app/views/Root"
import Home from "app/views/Home"
import Test from "app/views/Test"
import NotFound from "app/views/NotFound"
import {loading} from "app/actions/loader"

const routes = {
    path       : "/",
    component  : Root,
    indexRoute : { component: Home, onEnter: enterHandler },
    childRoutes: [
        { path: "test", component: Test },
        { path: "*", component: NotFound , onEnter: enterHandler}
    ]
}

function enterHandler ( nextState, replace, callback ) {
    App.store.dispatch( loading( true ) );
    TweenMax.delayedCall( 1, ()=> {
        App.store.dispatch( loading( false ) );
        callback();
    } )
}

export default routes;
