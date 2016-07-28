/**
 * Helper class for social sharing
 */
export default class Share {

    /**
     *  Opens a new window with the specified url and size
     * @param {string} url The url to be shared
     * @param {number} w The width of the new window
     * @param {number} h the height of the new window
     * @return {void}
     */
    static openWindow(url, w, h) {
        const left = (screen.availWidth - w) >> 1;
        const top = (screen.availHeight - h) >> 1;
        window.open(url, "", "top=" + top + ",left=" + left + ",width=" + w + ",height=" + h + ",location=no,menubar=no");
    }

    /**
     * Shares to Google+
     * @param {string} url The url to be shared
     * @return {void}
     */
    static plus(url) {
        url = encodeURIComponent(url);
        this.openWindow(`https://plus.google.com/share?url=${url}`, 650, 385);
    }

    /**
     * Shares to Pinterest
     * @param {string} url The url to be shared
     * @param {string} media The url to the media to be shared
     * @param {string} descr The description
     * @return {void}
     */
    static pinterset(url, media, descr) {
        url = encodeURIComponent(url);
        media = encodeURIComponent(media);
        descr = encodeURI(descr);
        this.openWindow(`http://www.pinterest.com/pin/create/button/?url=#{url}&media=${media}&description=${descr}`, 735, 310);
    }

    /**
     * Shares to Tumblr
     * @param {string} url The url be shared
     * @param {string} media The url of the media to be shared
     * @param {string} descr The description
     * @return {void}
     */
    static tumblr(url, media, descr) {
        url = encodeURIComponent(url);
        media = encodeURIComponent(media);
        descr = encodeURIComponent(descr);
        this.openWindow(`http://www.tumblr.com/share/photo?source=#{media}&caption=${descr}&click_thru=${url}`, 450, 430);
    }

    /**
     * Shares to facebook
     * @param {string} url The url to be shared
     * @param {string} descr the description
     * @return {void}
     */
    static facebook(url, descr = "") {
        url = encodeURIComponent(url);
        descr = encodeURIComponent(descr);
        this.openWindow(`http://www.facebook.com/share.php?u=${url}&t=${descr}`, 600, 300);
    }

    /**
     * Shares to twitter
     * @param {string} url The url to be shared
     * @param {string} descr The description
     * @return {void}
     */
    static twitter(url, descr = "") {
        url = encodeURI(url);
        descr = encodeURIComponent(descr);
        this.openWindow(`http://twitter.com/intent/tweet/?text=${descr}&url=${url}`, 600, 300);
    }

    /**
     * Shares to renren
     * @param {string} url The url to be shared
     * @return {void}
     */
    static renren(url) {
        url = encodeURIComponent(url);
        this.openWindow(`http://share.renren.com/share/buttonshare.do?link=${url}`, 600, 300);
    }

    /**
     * Shares to weibo
     * @param {string} url the url to be shared
     * @return {void}
     */
    static weibo(url) {
        url = encodeURIComponent(url);
        this.openWindow(`http://service.weibo.com/share/share.php?url=${url}&language=zh_cn`, 600, 300);
    }


}
