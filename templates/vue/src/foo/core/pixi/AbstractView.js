import AbstractContainer from "foo/core/pixi/AbstractContainer"
import Signal from "signals"

export default class AbstractView extends AbstractContainer {
    /**
     * @class AbstractView
     * @extends core.pixi.AbstractContainer
     * @namespace core.pixi
     * @constructor
     * @return {void}
     */
    constructor() {
        super();
        /**
         * Signal to be dispatched after view show animation
         *
         * Used by PIXI View Manager
         * @type {Signal}
         * @property opened
         */
        this.didOpened = new Signal();
        /**
         * Signal to be dispatched after view hidden animation
         *
         * Used by PIXI View Manager
         * @type {Signal}
         * @property closed
         */
        this.didClosed = new Signal();

        /**
         * Boolean that defines if the view is currently being animated
         * @property animating
         * @type {boolean}
         */
        this.animating = false;
    }

    /**
     * Called when the Object is added to the stage
     * @returns {void}
     * @abstract
     * @method init
     * @override
     */
    init() {
    }

    /**
     * Function called by PIXI view manager to show animation
     * @returns {void}
     * @abstract
     * @method open
     * @override
     */
    open() {
        this.animating = true;
    }


    opened = () => {
        this.didOpened.dispatch(this);
    };

    /**
     * Function called by PIXI view manager to hide animation
     * @returns {void}
     * @abstract
     * @method close
     * @override
     */
    close() {
        this.animating = false;
    }

    closed = () => {
        this.didClosed.dispatch(this);
    };

    /**
     * Called to cleanUp(destroy) the object
     * @returns {void}
     * @abstract
     * @method cleanUp
     * @override
     *
     */
    cleanUp() {

    }
}
