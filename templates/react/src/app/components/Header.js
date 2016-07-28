import "styles/components/Header"
import React, {Component} from "react"
import {Link} from "react-router"
import {loading} from 'app/actions/loader'

export default class Header extends Component {
    changeLocale ( e ) {
        App.setLocale( e.currentTarget.getAttribute( "data-lang" ) );
    }

    summonLoader ( e ) {
        App.store.dispatch( loading(true) );
    }

    render () {
        return (<div className="Header">
            <h1>Header</h1>
            <img src={require( "assets/img/logo.gif" )} alt="logo"/>
            <nav>
                <Link to={"/"}>Home</Link> / <Link to={"/test"}>Test</Link> / <Link to={"/404"}>404</Link>
            </nav>

            <ul>
                <li>
                    <button onClick={this.changeLocale} data-lang="es-MX">es</button>
                </li>
                <li>
                    <button onClick={this.changeLocale} data-lang="en-US">en</button>
                </li>
                <li>
                    <button onClick={this.summonLoader}>loader</button>
                </li>
            </ul>
        </div>)
    }
}
