/**
 * @class FacebookPixel
 * @namespace utils.tracking
 * @author Mendieta
 */

/**
 * Tracks an event for the given event ID.
 * @method trackEvent
 * @param {string} event The event ID
 */
export function trackEvent(event) {
    fbq("track", "Event", event);
}

/**
 * Tracks a page for the given route.
 * @param {string} route The route to be tracked
 * @method trackPage
 */
export function trackPage(route) {
    fbq("track", "PageView", route);
}

/**
 * Loads the Facebook Pixel script
 *
 * TODO: Implement loading of facebook pixel
 * @method load
 */
export function load() {

}

export default  {trackEvent, trackPage, load};
