/**
 * Created by mendieta on 7/8/16.
 */

import {combineReducers} from "redux"
import {routerReducer} from "react-router-redux"

import app from "foo/core/redux/reducer"

import count from "app/reducers/count"
import user from "app/reducers/user"
import loader from "app/reducers/loader"
import {reducer as form} from 'redux-form'

export default function createReducer () {
    return combineReducers( {
        app,
        routing: routerReducer,
        count,
        user,
        loader,
        form
    } )
}
