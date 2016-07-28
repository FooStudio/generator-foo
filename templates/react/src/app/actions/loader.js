/**
 * Created by mendieta on 7/21/16.
 */

import {LOADED, LOADING, PROGRESS} from "app/constants/loader"

export function loading (loading) {
    return { type: LOADING, loading: loading }
}

export function loaded () {
    return { type: LOADED }
}

export function progress ( pcent ) {
    return { type: PROGRESS, progress: pcent }
}
