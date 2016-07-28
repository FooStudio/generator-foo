/**
 * Created by mendieta on 1/14/16.
 */

import React, {Component} from "react";
import {connect} from "react-redux"
import TransitionGroup from "react-transition-group-plus"

// import Pixi from "app/views/pixi/Main"

// Components
import Loader from "app/components/Loader"
import Header from "app/components/Header"

class Root extends Component {
    static displayName = "App";

    init() {}

    onRender() {
        // this.renderer = PIXI.autoDetectRenderer( 800, 600, { backgroundColor: 0xcccccc } );
        // this.refs.pixi.appendChild( this.renderer.view );
        // this.stage = new Pixi();
    }

    render() {
        return (
            <div className="App">
                <Loader/>
                <Header/>
                <TransitionGroup className="Router" component="div" transitionMode="simultaneous" deferLeavingComponentRemoval={false}>
                    {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
                </TransitionGroup>
                <div ref="pixi"/>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {router: state.router, locale: state.app.locale}
}

export default connect(mapStatetoProps)(Root)
