import {LOADING, PROGRESS} from "app/constants/loader"

const initialState = {
    loading : false,
    progress: 0
}

export default function update ( state = initialState, action ) {
    if ( action.type === LOADING ) {
        return { ...state, loading: action.loading }
    } else if ( action.type === PROGRESS ) {
        return { ...state, progress: action.progress }
    }
    return state;
}
