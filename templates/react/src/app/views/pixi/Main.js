/**
 * Created by mendieta on 2/2/16.
 */

import PixiMain from "foo/core/pixi/PixiMain"
import ViewManager from "foo/core/pixi/PixiViewManager"

import SplashView from "app/views/pixi/SplashView"
import TestView from "app/views/pixi/TestView"

export default class Main extends PixiMain {
    constructor () {
        super();
        this.interactive = true;
    }

    init () {
        this.viewManager = new ViewManager( this, false );
        this.viewManager.addView( SplashView, "/" );
        this.viewManager.addView( TestView, "/test" );
        App.store.subscribe( ( store )=> {
            if ( store.router.pathname !== this.viewManager.currentRoute ) {
                this.viewManager.openView( store.router.pathname );
            }
        } );
        //AppDispatcher.ROUTED.add( this.onRouted, this );
    }

    onRouted ( ctx ) {
        this.viewManager.openView( ctx.pathname );
    }

}
