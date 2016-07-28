//import "pixi.js"

export default class AbstractContainer extends PIXI.Container {

    /**
     * @constructor
     * @return {void}
     */
    constructor() {
        super();
        this.init();
    }

    /**
     * Called when the Object is added to the stage
     * @returns {void}
     * @abstract
     */
    init() {

    }

    /**
     * Called to destroy the object
     * @return {void}
     * @abstract
     */
    destroy() {

    }
}
