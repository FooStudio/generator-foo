/**
 * Created by mendieta on 7/28/16.
 */

export function mainLoaderDisappear () {
    return new TimelineMax()
        .to('#main-loader', 2, {
            autoAlpha: 0,
            ease     : Sine.easeIn,
            overwrite: 'all'
        } );
}
