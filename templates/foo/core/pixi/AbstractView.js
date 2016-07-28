import AbstractContainer from "foo/core/pixi/AbstractContainer"
import Signal from "signals"

export default class AbstractView extends AbstractContainer {
    /**
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
         */
        this.opened = new Signal();
        /**
         * Signal to be dispatched after view hidden animation
         *
         * Used by PIXI View Manager
         * @type {Signal}
         */
        this.closed = new Signal();
    }

    /**
     * Called when the Object is added to the stage
     * @returns {void}
     * @abstract
     */
    init() {
    }

    /**
     * Function called by PIXI view manager to show animation
     * @returns {void}
     * @abstract
     */
    open() {

    }

    /**
     * Function called by PIXI view manager to hide animation
     * @returns {void}
     * @abstract
     */
    close() {

    }

    /**
     * Called to destroy the object
     * @returns {void}
     * @abstract
     */
    destroy() {

    }
}
