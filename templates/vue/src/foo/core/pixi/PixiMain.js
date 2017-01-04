//import "pixi.js"

export default class PixiMain extends PIXI.Container {
    /**
     * Pixi.js App Main class
     * @returns {void}
     * @class PixiMain
     * @namespace core.pixi
     * @extends PIXI.Container
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
     * @override
     * @method init
     */
    init() {

    }

    /**
     * Called to cleanup(destroy) the object
     * @return {void}
     * @abstract
     * @override
     * @method cleanUp
     */
    cleanUp() {

    }
}
