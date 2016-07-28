/**
 * Created by mendieta on 7/21/16.
 */


export function loaderAppear ( utils ) {
    return new TimelineMax()
        .to( utils.target, 0.5, {
            autoAlpha: 1,
            ease     : Sine.easeOut,
            overwrite: 'all'
        } );
}

export function loaderDisappear ( utils ) {
    return new TimelineMax()
        .to( utils.target, 0.5, {
            autoAlpha: 0,
            ease     : Sine.easeIn,
            overwrite: 'all'
        } );
}

export function mainLoaderDisappear () {
    return new TimelineMax()
        .to('#main-loader', 2, {
            autoAlpha: 0,
            ease     : Sine.easeIn,
            overwrite: 'all'
        } );
}
