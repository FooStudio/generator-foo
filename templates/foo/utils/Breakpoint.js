/**
 * Created by mendieta on 6/29/16.
 */

import Bowser from "bowser"
import isMobile from "ismobilejs"
import ObjectUtils from "foo/utils/ObjectUtils"

export default class Breakpoint {
    static setup(){
        this.body = document.getElementsByTagName("body")[0];
        this.mobile();
        this.bowser();
    }

    static bowser(){
        this.body.classList.add(Bowser.name);
        this.body.classList.add(Bowser.version);
    }

    static mobile(){
        for(let key of ObjectUtils.getKeys(isMobile)){
            if(typeof isMobile[key] !== "object" && isMobile[key] == true && key !== "any"){
                this.body.classList.add(key);
            }

            if(typeof isMobile[key] == "object"){
                for(let k of ObjectUtils.getKeys(isMobile[key])){
                    if(isMobile[key][k] == true){
                        this.body.classList.add(key);
                        break;
                    }
                }
            }
        }
    }

}
