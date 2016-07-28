//import "pixi.js"

/**
 * Pixi.js App Main class
 */
export default class PixiMain extends PIXI.Container {
    /**
     * @returns {void}
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
