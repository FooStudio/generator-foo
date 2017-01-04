/**
 * Created by mendieta on 11/7/16.
 */

export function mainLoaderDisappear() {

    return new Promise((resolve, reject) => {
        let element = document.getElementById("main-loader");

        let tl = new TimelineMax({
            onComplete: () => {
                element.parentNode.removeChild(element);
                element = null;
                resolve();
            }
        });

        tl.to(element, 1, {
            autoAlpha: 0,
            ease: Sine.easeIn,
            overwrite: 'all',
        })
    });

}
