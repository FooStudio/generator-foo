/**
 * Created by mendieta on 7/11/16.
 */

import Requester from "foo/net/Requester"

export default class Analytics {

    static GOOGLE = "google"

    tags;
    started = false;
    adapter;

    currentRoute = "";

    /**
     *
     * @param tags
     * @param adapter
     * @param callback
     */
    constructor(tags, adapter = Analytics.GOOGLE, callback = null) {
        this.adapter = adapter
        Requester.getJSON(tags, (error, data) => {
            this.tags = data.body;
            this.started = true;
            if (callback != null)
                callback()
            App.store.subscribe(this._startTracking)
        })
    }

    /**
     * Store Subscribe listener that track page views
     * @private
     * @return {void
     */
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

    /**
     * Search for a match on the tracking data and pushes to analytics
     * @param {string} param Param of the tracking tag to be pushed on analytics
     */
    trackEvent(param) {
        if (!this.started)
            return;
        if (route) {
            const v = this.tags[param]
            if (v) {
                if (App.DEBUG)
                    console.info("Track Event:", v);
                switch (this.adapter) {
                    case Analytics.GOOGLE:
                        this._trackEventGoogle(v);
                        break;
                    default:
                        console.warn("Analytics: ", "Adapter not defined or not found!")
                }
            }
        }
    }

    _trackEventGoogle(v) {
        let args = ["send", "event"]
        for (let arg of v) {
            args.push(arg)
            window.ga(...args);
        }
    }

    /**
     * Tracks a page view, with the specified route
     * @param {string} route Route of the tracking tag to be pushed on analytics
     */
    trackPage(route) {
        if (!this.started)
            return;
        if (route) {
            if (App.DEBUG)
                console.info("Track Page View:", route);
            switch (this.adapter) {
                case Analytics.GOOGLE:
                    this._trackPageGoogle(route);
                    break;
                default:
                    console.warn("Analytics: ", "Adapter not defined or not found!")
            }
        }
    }

    _trackPageGoogle(route) {
        window.ga("set", "page", route);
        window.ga("send", "pageview");
    }
}
