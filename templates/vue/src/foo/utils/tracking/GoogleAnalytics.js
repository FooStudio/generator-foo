/**
 * @class GoogleAnalytics
 * @namespace utils.tracking
 * @author Mendieta
 */

/**
 * Tracks an event for the given event ID.
 * @method trackEvent
 * @param {string} event The event ID
 */
export function trackEvent(event) {
    let args = ["send", "event"];
    for (let arg of event) {
        args.push(arg);
        window.ga(...args);
    }
}

/**
 * Tracks a page for the given route.
 * @param {string} route The route to be tracked
 * @method trackPage
 */
export function trackPage(route) {
    window.ga("set", "page", route);
    window.ga("send", "pageview");
}

/**
 * Loads Google analytics SDK
 * @method load
 * @param {string} ID The GA ID to use.
 */
export function load(ID) {
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    ga('create', ID, 'auto');
    ga('send', 'pageview');
}

export default {trackEvent, trackPage, load};
