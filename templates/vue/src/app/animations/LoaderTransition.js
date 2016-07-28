import Vue from "vue"

Vue.transition( "LoaderTransition", {
    css           : false,
    enter         : function ( el, done ) {
        TweenMax.to( el, 0.5, { autoAlpha: 1, ease: Sine.easeOut, onComplete: done } );
    },
    enterCancelled: function ( el ) {},
    leave         : function ( el, done ) {
        TweenMax.to( el, 0.5, { autoAlpha: 0, ease: Sine.easeOut, onComplete: done } );
    },
    leaveCancelled: function ( el ) {}
} )

