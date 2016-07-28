/**
 * Created by mendieta on 7/15/16.
 */

import Vue from "vue"

Vue.transition( "MainTransition", {
    css           : false,
    enter         : function ( el, done ) {
        TweenMax.fromTo( el, 0.65, { alpha: 0 }, { alpha: 1, onComplete: done } );
    },
    enterCancelled: function ( el ) {

    },
    leave         : function ( el, done ) {
        TweenMax.to( el, 0.55, { alpha: 0, onComplete: done } );
    },
    leaveCancelled: function ( el ) {

    }
} )

