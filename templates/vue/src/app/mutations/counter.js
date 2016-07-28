/**
 * Created by mendieta on 7/14/16.
 */

import {INCREMENT, DECREMENT} from "app/constants/counter"

const module = {
    state    : {
        count: 0
    },
    mutations: {
        [INCREMENT]( state, amount ){
            state.count = state.count + amount;
        },
        [DECREMENT]( state, amount ){
            state.count = state.count - amount;
        }
    }
}

export default module;
