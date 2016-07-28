/**
 * Created by mendieta on 7/20/16.
 */

import {LOADED, LOADING, PROGRESS} from "app/constants/loader"

export const loading = ( { dispatch, state }, loading ) => {
    dispatch( LOADING, loading);
}

export const loaded = ( { dispatch, state } ) => {
    dispatch( LOADED );
}

export const progress = ( { dispatch, state }, pcnt ) => {
    dispatch( PROGRESS, pcnt );
}
