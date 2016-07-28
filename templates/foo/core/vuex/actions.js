import {LOCALE_CHANGED, LOCALE_LOADING, RESIZE, STARTED} from "foo/core/vuex/constants"

export const locale_changed = ( { dispatch, state }, locale ) => {
    dispatch( LOCALE_CHANGED, locale );
}

export const locale_loading = ( { dispatch, state } ) => {
    dispatch( LOCALE_LOADING );
}

export const resized = ( { dispatch, state }, size ) => {
    dispatch( RESIZE, size );
}

export const started = ( { dispatch, state } ) => {
    dispatch( STARTED );
}
