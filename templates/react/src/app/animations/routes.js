export function routeAppear ( utils ) {
    return new TimelineMax()
        .fromTo( utils.target, 0.5, {
            alpha: 0,
        }, {
            alpha     : 1,
            ease      : Sine.easeOut,
            overwrite : 'all',
            onComplete: utils.options.callback
        } );
}

export function routeLeave ( utils ) {
    return new TimelineMax()
        .to( utils.target, 0.5, {
            alpha     : 0,
            ease      : Sine.easeIn,
            overwrite : 'all',
            onComplete: utils.options.callback
        } );
}
