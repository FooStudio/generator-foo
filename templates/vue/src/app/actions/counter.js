/**
 * Created by mendieta on 7/14/16.
 */

import {INCREMENT, DECREMENT} from "app/constants/counter"

export const incrementCounter = ( { dispatch, state } )=> {
    dispatch( INCREMENT, 1 );
};

export const decrementCounter = ( { dispatch, state } ) => {
    dispatch( DECREMENT, 1 );
}
