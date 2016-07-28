/**
 * Created by mendieta on 7/17/16.
 */


const VueFoo = {};

VueFoo.install = function ( Vue, options ) {
    Vue.prototype.$rendered  = options.app.rendered
    Vue.prototype.$setLocale = options.app.setLocale
    Vue.rendered             = options.app.rendered
    Vue.setLocale            = options.app.setLocale
}

export default VueFoo;
