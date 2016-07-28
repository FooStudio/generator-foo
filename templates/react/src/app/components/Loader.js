import "styles/components/Loader"
import React, {Component} from "react"
import gsap from "react-gsap-enhancer"

import {connect} from "react-redux"
import ctg from "foo/core/redux/redux-transition"

import {loaderAppear, loaderDisappear} from "app/animations/loader"
import {loading} from 'app/actions/loader'

@gsap()
class Loader extends Component {

    static displayName = "Loader";
    static propTypes   = {}

    componentWillReceiveProps (nextProps) {
        const {loading} = nextProps;
        if (loading) {
            this.addAnimation(loaderAppear);
        } else {
            this.addAnimation(loaderDisappear);
        }
    }

    unsummonLoader ( e ) {
        App.store.dispatch( loading(false) );;
    }

    render () {
        const {progress} = this.props;
        return (
            <div className="internal-loader">
                <h5>Internal Loading</h5>
                <p>Progress: {progress}</p>
                <button onClick={this.unsummonLoader}>loader</button>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return { loading: state.loader.loading, progress: state.loader.progress }
}

export default ctg( connect( mapStateToProps, null, null, { withRef: true } )( Loader ) )
