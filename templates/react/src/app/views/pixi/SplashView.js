import AbstractView from "foo/core/pixi/AbstractView"

export default class SplashView extends AbstractView {

    init() {
        const textSample = new PIXI.Text("Splash", {
            font: "35px Arial",
            fill: "white",
            align: "left"
        });
        textSample.position.set(0);
        this.addChild(textSample);
    }

    open() {
        TweenMax.from(this.position, 0.7, {x: "+=300", ease: Power4.easeOut, onComplete: this.opened.dispatch});
        TweenMax.fromTo(this, 0.6, {alpha: 0}, {alpha: 1, ease: Sine.easeOut});
    }

    close() {
        TweenMax.to(this.position, 0.7, {x: "-=300", ease: Power4.easeOut, onComplete: this.closed.dispatch});
        TweenMax.to(this, 0.6, {alpha: 0, ease: Sine.easeOut});
    }

    destroy() {
    }

}
