import Bowser from "bowser"
import isMobile from "ismobilejs"

/**
 * Static helper class to add meaningful classes to HTML body.
 * @class Breakpoint
 * @namespace utils
 * @author Mendieta
 */
export default class Breakpoint {
    /**
     * Calls the mobile and browser handlers.
     * @method setup
     * @static
     * @public
     */
    static setup() {
        this.body = document.getElementsByTagName("body")[0];
        this._mobile();
        this._bowser();
    }

    /**
     * Setups class names depending on browser.
     * @method _bowser
     * @private
     * @static
     */
    static _bowser() {
        //IE BREAKS IF YOU ADD A CLASS WITH SPACES
        const name = (Bowser.name == "Internet Explorer") ? "IE" : Bowser.name;
        this.body.classList.add(name);
        this.body.classList.add(Bowser.version);
    }

    /**
     * Setups class names depending on mobile device.
     * @method _mobile
     * @private
     * @static
     */
    static _mobile() {
        const keys = Object.keys(isMobile);
        for (let key of keys) {
            if (typeof isMobile[key] !== "object" && isMobile[key] == true && key !== "any") {
                this.body.classList.add(key);
            }

            if (typeof isMobile[key] == "object") {
                const keys2 = Object.keys(isMobile[key]);
                for (let k of keys2) {
                    if (isMobile[key][k] == true && k !== "blackberry" && k !== "blackberry10" && k !== "chrome" && k !== "device" && k !== "firefox" && k !== "opera") {
                        this.body.classList.add(key);
                        break;
                    }
                }
            }
        }
    }
}
