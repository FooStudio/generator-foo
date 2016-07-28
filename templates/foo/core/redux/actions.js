/**
 * Created by mendieta on 7/13/16.
 */

import {LOCALE_CHANGED, LOCALE_LOADING, RESIZE, RENDER, STARTED} from "foo/core/redux/constants"

export function locale_changed ( locale, locale_data ) {
    return {
        type  : LOCALE_CHANGED,
        locale: locale,
        locale_data: locale_data
    }
}

export function locale_loading () {
    return {
        type: LOCALE_LOADING
    }
}
export function resize ( width, height ) {
    return {
        type: RESIZE,
        size: { width, height }
    }
}

export function rendered () {
    return {
        type: RENDER
    }
}

export function started () {
    return {
        type: STARTED
    }
}
