/**
 * Created by mendieta on 2/18/16.
 */

import Signal from "signals"

export default class PixiViewManager {

    /**
     * Pixi view manager, router agnostic.
     *
     *      this.viewManager = new ViewManager(this);
     *      this.viewManager.addView(new SplashView(), "/");
     *      this.viewManager.addView(new TestView(), "/test");
     *      this.viewManager.openView("/");
     *
     * @constructor
     * @class PixiViewManager
     * @namespace core.pixi
     * @author Mendieta
     * @param {PIXI.Container} container The container on which the views will be shown
     * @param {boolean} [concurrent=false] Defines if the show/hide animations are concurrent
     * @returns {void}
     */
    constructor(container, concurrent = false) {
        /**
         * Defines if the show/hide animations are concurrent
         * @type {boolean}
         * @property concurrent
         * @default false
         */
        this.concurrent = concurrent;

        /**
         * The container on which the views will be shown
         * @type {PIXI.Container}
         * @property container
         */
        this.container = container;

        /**
         * The object to add the views references to
         * @type {Map}
         * @property views
         */
        this.views = new Map();

        /**
         * The prevView reference, used for concurrent animations
         * @type {foo.core.pixi.AbstractView|null}
         * @property prevView
         * @default null
         */
        this.prevView = null;

        /**
         * The currentView reference
         * @type {foo.core.pixi.AbstractView|null}
         * @property currentView
         * @default null
         */
        this.currentView = null;

        /**
         * The next view reference
         * @type {foo.core.pixi.AbstractView|null}
         * @property nextView
         * @default null
         */
        this.nextView = null;

        /**
         * The current route
         * @type {string}
         * @property currentRoute
         * @default ""
         */
        this.currentRoute = "";

        /**
         * The next route
         * @type {string}
         * @property nextRoute
         * @default ""
         */
        this.nextRoute = "";

        /**
         * The next route
         * @type {string}
         * @property prevRoute
         * @default ""
         */
        this.prevRoute = "";

        /**
         * The Signal to be dispatched when a view has been shown
         * @type {Signal}
         * @property vieOpened
         */
        this.viewOpened = new Signal();

        /**
         * The Signal to be dispatched when a view has been closed
         * @type {Signal}
         * @property viewClosed
         */
        this.viewClosed = new Signal();
    }

    /**
     * Adds a view to the
     *
     * The same view can not be added twice, and the same rule applies for the routes
     *
     * @param {PIXI.Container} view The view class to be added
     * @param {string} route The to be matched for the given view
     * @returns {boolean} If the view was successfully added
     * @method addView
     */
    addView(view, route) {
        if (this.views.get(route) != undefined) {
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
     * @method openView
     */
    openView(route) {
        if (!this.views.get(route)) {
            console.error("The given route: " + route + " don't match a route in PixiViewManger");
            return false
        }
        if (this.currentRoute === route) {
            console.warn("PixiViewManager: already at given route: " + route);
            return false;
        }
        if (this.currentView != null) {
            this.nextRoute = route;
            this._closeView(this.currentView);
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
     * @method _showView
     */
    _showView(route) {
        // let View = this.views.get(route);
        this.nextView = this.views.get(route);
        if (this.currentRoute){
            this.prevRoute = this.currentRoute;
        }
        this.currentRoute = route;
        this.nextView.didOpened.addOnce(this._onViewOpened, this);
        this.container.addChild(this.nextView);
        this.nextView.open();
    }

    /**
     * View opened event handler
     * @private
     * @return {void}
     * @method _onViewOpened
     */
    _onViewOpened(view) {
        this.viewOpened.dispatch();
        this.currentView = view;
        this.nextView = null;
    }

    /**
     * Closes the current view
     * @private
     * @returns {void}
     * @method _closeCurrentView
     */
    _closeView(view) {
        view.didClosed.addOnce(this._onViewClosed, this);
        view.close();
    }

    /**
     * View closed event handler
     * @private
     * @return {void}
     * @method _onViewClosed
     */
    _onViewClosed(view) {
        this.viewClosed.dispatch();
        this.container.removeChild(view);
        if (!this.concurrent) {
            this._showView(this.nextRoute);
        }
    }

}
