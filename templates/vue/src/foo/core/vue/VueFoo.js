/**
 * Created by mendieta on 7/17/16.
 */

import request from "superagent"

const VueFoo = {};

VueFoo.install = function (Vue, options) {
    //LOCALE
    Vue.prototype.$setLocale = options.app.setLocale;
    Vue.setLocale = options.app.setLocale;

    //SUPERAGENT || HTTP
    Vue.prototype.$get = request.get;
    Vue.prototype.$post = request.post;
    Vue.prototype.$delete = request.del;
    Vue.prototype.$head = request.head;
    Vue.prototype.$put = request.put;
    Vue.prototype.$patch = request.patch;

    //ANALYTICS
    Vue.prototype.$trackEvent = App.analytics.trackEvent;
};

export default VueFoo;
