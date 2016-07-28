/**
 * Created by mendieta on 7/8/16.
 */

import {INCREASE, DECREASE} from "app/constants/app"

const initialState = {
    number: 1
}

export default function update ( state = initialState, action ) {
    if ( action.type === INCREASE ) {
        return { number: state.number + action.amount }
    } else if ( action.type === DECREASE ) {
        return { number: state.number - action.amount };
    }
    return state;
}
