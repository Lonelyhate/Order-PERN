import { GET_STATUS } from "../consts";

const initialState = {
    statuses: []
}

export const statusOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATUS:
            return {
                ...state,
                statuses: action.payload
            }
        default:
            return state
    }
}