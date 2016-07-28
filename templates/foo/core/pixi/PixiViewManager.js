/**
 * Created by mendieta on 2/18/16.
 */

import Signal from "signals"

/**
 * Pixi view manager, router agnostic.
 *
 *
 * @example
 * this.viewManager = new ViewManager(this);
 * this.viewManager.addView(SplashView, "/");
 * this.viewManager.addView(TestView, "/test");
 * this.viewManager.openView("/");
 */
export default class PixiViewManager {

    /**
     * @constructor
     * @param {PIXI.Container} container The container on which the views will be shown
     * @param {boolean} [concurrent=false] Defines if the show/hide animations are concurrent
     * @returns {void}
     */
    constructor(container, concurrent = false) {
        /**
         * Defines if the show/hide animations are concurrent
         * @type {boolean}
         */
        this.concurrent = concurrent;

        /**
         * The container on which the views will be shown
         * @type {PIXI.Container}
         */
        this.container = container;

        /**
         * The object to add the views references to
         * @type {Map}
         */
        this.views = new Map();

        /**
         * The prevView reference, used for concurrent animations
         * @type {foo.core.pixi.AbstractView|null}
         */
        this.prevView = null;

        /**
         * The currentView reference
         * @type {foo.core.pixi.AbstractView|null}
         */
        this.currentView = null;

        /**
         * The next view reference
         * @type {foo.core.pixi.AbstractView|null}
         */
        this.nextView = null;

        /**
         * The current route
         * @type {string}
         */
        this.currentRoute = "";

        /**
         * The next route
         * @type {string}
         */
        this.nextRoute = "";

        /**
         * The Signal to be dispatched when a view has been shown
         * @type {Signal}
         */
        this.viewOpened = new Signal();

        /**
         * The Signal to be dispatched when a view has been closed
         * @type {Signal}
         */
        this.viewClosed = new Signal();
    }

    /**
     * Adds a view to the
     *
     * The same view can not be added twice, and the same rule applies for the routes
     *
     * @param {Class} view The view class to be added
     * @param {string} route The to be matched for the given view
     * @returns {boolean} If the view was successfully added
     */
    addView(view, route) {
        if (this.views.get(route) !== undefined) {
            console.error("PixiViewManger: A route can not be added twice - " + route);
            return false;
        }
        this.views.set(route, view);
        return true;
    }

    /**
     * Opens the view for the given route
     * @param {string} route The route to be opened
     * @returns {boolean} A boolean determining if the view exists on the manager and can be opened
     */
    openView(route) {
        if (!this.views.get(route)) {
            console.error("The given route: " + route + " don't match a route in PixiViewManger");
            return false
        }
        if (this.currentRoute === route) {
            console.warn("PixiViewManager already at given route: " + route);
            return false;
        }
        if (this.currentView !== null) {
            this.nextRoute = route;
            this._closeCurrentView();
            if (this.concurrent) {
                this._showView(route);
            }
        } else {
            this._showView(route);
        }
        return true;
    }

    /**
     * Instantiates and shows view according to route
     * @param {string} route The route to be shown
     * @private
     * @return {void}
     */
    _showView(route) {
        const View = this.views.get(route);
        this.nextView = new View();
        this.currentRoute = route;
        this.nextView.opened.addOnce(this._onViewOpened, this);
        this.container.addChild(this.nextView);
        this.nextView.open();
    }

    /**
     * View opened event handler
     * @private
     * @return {void}
     */
    _onViewOpened() {
        this.viewOpened.dispatch();
        this.currentView = this.nextView;
        this.nextView = null;
    }

    /**
     * View closed event handler
     * @private
     * @return {void}
     */
    _onViewClosed() {
        const view = this.concurrent ? this.prevView : this.currentView;
        this.viewClosed.dispatch();
        this.container.removeChild(view);
        if (!this.concurrent) {
            this._showView(this.nextRoute);
        } else {
            this.prevView = null;
        }
    }

    /**
     * Closes the current view
     * @private
     * @returns {void}
     */
    _closeCurrentView() {
        this.currentView.closed.addOnce(this._onViewClosed, this);
        this.currentView.close();
        if (this.concurrent) this.prevView = this.currentView;
    }

}
