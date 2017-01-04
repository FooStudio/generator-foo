import Requester from "foo/net/Requester"
import GoogleAnalytics from "foo/utils/tracking/GoogleAnalytics"
import store from "app/store"

export default class Analytics {

    static GOOGLE = "google";

    /**
     * The tags object to be searched upon.
     * @property tags
     * @default null
     * @type {Object}
     */
    tags;

    /**
     * Defines if teh analytics has started.
     * @property started
     * @default false
     * @type {boolean}
     */
    started = false;

    /**
     * The adapter(s) to be used.
     * @property adapter
     * @default "google"
     * @type {string|array}
     */
    adapter;

    /**
     * The analytics default route page.
     * @property currentRoute
     * @default ""
     * @type {string}
     */
    currentRoute = "";

    /**
     * Analytics static helper class.
     * Loads the tags and initialize tracking.
     * @param {string} tags The tags url file to be loaded.
     * @param {string|array} adapter A string or an array os strings containing the adapters string IDs.
     * @param {function} callback Function to be called after successful initialization.
     * @constructor
     * @class Analytics
     * @namespace utils
     * @author Mendieta
     */
    constructor(tags, adapter = Analytics.GOOGLE, callback = null) {
        this.adapter = adapter;
        Requester.getJSON(tags)
            .then((response) => {
                this.tags = response.data;
                this.started = true;
                if (callback != null) callback();
                store.subscribe(this._handleTracking.bind(this));
            })
            .then(undefined, (error) => {
                console.error("Error loading analytics tags:", error);
            })
    }

    /**
     * Handles the router route mutations.
     * @param {Object} mutation The store mutation that dispatched the handler.
     * @param {Object} state The store state.
     * @private
     * @method _handleTracking
     */
    _handleTracking(mutation, state) {
        if (mutation.type === "router/ROUTE_CHANGED") {
            this.currentRoute = mutation.payload.path;
            this.trackPage(this.currentRoute);
        }
    }

    /**
     * Search for a match on the tracking data and pushes to analytics adapter(s).
     * @param {string} param Param of the tracking tag to be pushed on analytics.
     * @method trackEvent
     */
    trackEvent(param) {
        if (!this.started) return;

        if (route) {
            const v = this.tags[param];
            if (v) {
                if (App.DEBUG) console.info("Track Event:", v);
                for (let adapter of this.adapter) {
                    switch (adapter) {
                        case Analytics.GOOGLE:
                            GoogleAnalytics.trackEvent(v);
                            break;
                        default:
                            console.warn("Analytics: ", "Adapter not defined or not found!")
                    }
                }
            }
        }
    }

    /**
     * Tracks a page view, with the specified route.
     * @param {string} route Route of the tracking tag to be pushed on analytics adapter(s).
     * @method trackPage
     */
    trackPage(route) {
        if (!this.started) return;
        if (route) {
            if (App.DEBUG) console.info("Track Page View:", route);
            for (let adapter of this.adapter) {
                switch (adapter) {
                    case Analytics.GOOGLE:
                        GoogleAnalytics.trackPage(route);
                        break;
                    default:
                        console.warn("Analytics: ", "Adapter not defined or not found!")
                }
            }
        }
    }

}
