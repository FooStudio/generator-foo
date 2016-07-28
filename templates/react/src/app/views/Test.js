import "styles/views/Test"
import React from "react"
import {connect} from "react-redux"
import ctg from "foo/core/redux/redux-transition"
import Form from "app/components/Form"

import {routeAppear, routeLeave} from 'app/animations/routes'
import gsap from 'react-gsap-enhancer'

const mapStateToProps = ( state ) => {
    return { locale: state.app.locale_data }
}

@ctg
@connect( mapStateToProps, null, null, { withRef: true } )
@gsap()
export default class Test extends React.Component {

    static displayName = "Test";
    state       = {
        submit   : false,
        submitted: false
    };

    componentWillEnter ( callback ) {
        this.addAnimation( routeAppear, { callback } );
    }

    componentWillLeave ( callback ) {
        this.addAnimation( routeLeave, { callback } );
    }

    handleSubmit = ( data ) => {
        this.setState( { submit: true } );
        const d = new FormData();
        for ( const key in data ) {
            if ( {}.hasOwnProperty.call( data, key ) ) {
                d.append( key, data[ key ] );
            }
        }
        this.setState( { submit: false, submitted: true } );
    }

    render () {
        return (
            <div className="Test">
                <h2>{$t( "test.title" )}</h2>
                <h3>{$t( "test.subtitle" )}</h3>
                <Form onSubmit={this.handleSubmit} submit={this.state.submit} submitted={this.state.submitted}/>
            </div>
        )
    }
}
