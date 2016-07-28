/**
 * Created by mendieta on 7/13/16.
 */

import {createStore} from "redux"
import createReducer from "app/reducers"

export default function configureStore ( initialState, history ) { // eslint-disable-line
    const store = createStore( createReducer(), window.devToolsExtension && window.devToolsExtension(), initialState )

    if ( module.hot ) {
        module.hot.accept( './reducers', () => {
            System.import( './reducers' ).then( ( reducerModule ) => {
                const createReducers = reducerModule.default;
                const nextReducers   = createReducers( store.asyncReducers );
                store.replaceReducer( nextReducers );
            } );
        } );
    }

    return store;
}
