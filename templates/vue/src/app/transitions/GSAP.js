import Vue from "vue"

export default  Vue.component("GSAP", {
    functional: true,
    render: function (h, ctx) {
        let vm = ctx.parent;
        let data = {
            props: {
                name: "GSAP",
                css: false,
                appear: true,
                //mode:"out-in"
            },
            on: {
                beforeEnter: function (el) {

                },
                enter: function (el, done) {
                    TweenMax.fromTo(el, 0.55, {x: 300, alpha: 0}, {
                        x: 0,
                        alpha: 1,
                        ease: Power3.easeOut,
                        onComplete: done
                    });
                },
                afterEnter: function (el) {

                },
                enterCancelled: function (el) {

                },
                beforeLeave: function (el) {

                },
                leave: function (el, done) {
                    TweenMax.to(el, 0.55, {x: -300, alpha: 0, ease: Power3.easeOut, onComplete: done});
                },
                afterLeave: function (el) {

                },
                leaveCancelled: function (el) {

                }
            }
        };
        return h("transition", data, ctx.children);
    }
})
