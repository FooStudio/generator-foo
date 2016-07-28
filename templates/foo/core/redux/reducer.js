/**
 * Created by mendieta on 7/13/16.
 */

import {LOCALE_CHANGED, LOCALE_LOADING, RESIZE, RENDER, STARTED} from "foo/core/redux/constants"

const initialState = {
    started       : false,
    locale        : "",
    locale_data   : null,
    locale_loading: false,
    size          : { width: window.innerWidth, height: window.innerHeight }
}

export default function update ( state = initialState, action ) {
    switch ( action.type ) {
        case LOCALE_CHANGED:
            return { ...state, locale: action.locale, locale_data: action.locale_data, locale_loading: false };
        case LOCALE_LOADING:
            return { ...state, locale_loading: true };
        case RESIZE:
            return { ...state, size: action.size };
        case RENDER:
            break
        case STARTED:
            return { ...state, started: true };
    }
    return state
}
