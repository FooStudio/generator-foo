import Vue from "vue"

export default  Vue.component("LoaderTransition", {
    functional: true,
    render: function (createElement, context) {
        var data = {
            props: {
                name: "LoaderTransition",
                css: false,
                //mode:"out-in"
            },
            on: {
                beforeEnter: function (el) {

                },
                enter: function (el, done) {
                    TweenMax.fromTo(el, 0.5, {alpha: 0}, {alpha: 1, ease: Sine.easeOut, onComplete: done})
                },
                afterEnter: function (el) {

                },
                enterCancelled: function (el) {

                },
                beforeLeave: function (el) {

                },
                leave: function (el, done) {
                    TweenMax.to(el, 0.5, {alpha: 0, ease: Sine.easeOut, onComplete: done});
                },
                afterLeave: function (el) {

                },
                leaveCancelled: function (el) {

                }
            }
        };
        return createElement("transition", data, context.children);
    }
})
