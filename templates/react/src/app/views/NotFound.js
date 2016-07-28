import "styles/views/Test"
import React from "react"
import {connect} from "react-redux"
import ctg from "foo/core/redux/redux-transition"

import {routeAppear, routeLeave} from 'app/animations/routes'
import gsap from 'react-gsap-enhancer'

const mapStateToProps = ( state ) => {
    return { locale: state.app.locale_data }
}

@ctg
@connect( mapStateToProps, null, null, { withRef: true } )
@gsap()
export default class Test extends React.Component {

    static displayName = "404";
    componentWillEnter ( callback ) {
        this.addAnimation( routeAppear, { callback } );
    }

    componentWillLeave ( callback ) {
        this.addAnimation( routeLeave, { callback } );
    }
    render () {
        return (
            <div className="NotFound">
                <h2>{$t( "notFound.title" )} Foo</h2>
                <h3>{$t( "notFound.subtitle" )}</h3>
            </div>
        )
    }
}
