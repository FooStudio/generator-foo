/**
 * Created by mendieta on 7/28/16.
 */

import Requester from "foo/net/Requester"
import Analytics from "foo/utils/Analytics"

export default class ReactAnalytics extends Analytics{
    constructor (tags, adapter = Analytics.GOOGLE, callback = null){
        super(tags, adapter, callback);
        Requester.getJSON(tags, (error, data) => {
            this.tags = data.body;
            this.started = true;
            if (callback != null)
                callback()
            App.store.subscribe(this._startTracking)
        })
    }

    _startTracking = () => {
        const state = App.store.getState();
        if (state.routing.locationBeforeTransitions) {
            const path = state.routing.locationBeforeTransitions.pathname
            if (this.currentRoute !== path) {
                this.currentRoute = path
                this.trackPage(this.currentRoute);
            }
        }
    }
}
