import AbstractView from "foo/core/pixi/AbstractView"

export default class TestView extends AbstractView {

    init() {
        const textSample = new PIXI.Text("Test View", {
            font: "35px Arial",
            fill: "white",
            align: "left"
        });
        textSample.position.set(20);
        this.addChild(textSample);
    }

    open() {
        TweenMax.fromTo(this, 0.75, {alpha: 0}, {alpha: 1, ease: Sine.easeOut, onComplete: this.opened.dispatch});
    }

    close() {
        TweenMax.to(this, 0.75, {alpha: 0, ease: Sine.easOut, onComplete: this.closed.dispatch})
    }

    destroy() {
    }

}
