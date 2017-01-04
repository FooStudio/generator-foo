//import "pixi.js"

export default class AbstractContainer extends PIXI.Container {

    /**
     * @class AbstractContainer
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
     * @method init
     * @override
     */
    init() {

    }

    /**
     * Called to cleanUp(destroy) the object
     * @return {void}
     * @abstract
     * @method cleanUp
     * @override
     */
    cleanUp() {

    }
}
