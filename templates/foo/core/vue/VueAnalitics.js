/**
 * Created by mendieta on 7/28/16.
 */

import Analytics from "foo/utils/Analytics"
import Requester from "foo/net/Requester"
import store from "app/store"

export default class VueAnalitics extends Analytics {
    constructor ( tags, adapter = Analytics.GOOGLE, callback = null ) {
        super( tags, adapter, callback );
        Requester.getJSON( tags, ( error, data )=> {
            this.tags    = data.body;
            this.started = true;
            if ( callback != null ) callback()
            store.subscribe( this._startTracking );
        } )
    }

    _startTracking = ( mutation, store )=> {
        if ( mutation.type === "router/route_changed" ) {
            this.currentRoute = mutation.payload[ 0 ].path;
            this.trackPage( this.currentRoute );
        }
    }
}
