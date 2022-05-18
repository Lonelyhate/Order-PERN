import { ACTIVE_TYPE_DISH, GET_TYPES_DISH, TYPES_LOADING } from "../consts";

const initialState = {
    typesDish: [],
    activeDish: 0,
    loading: false
}

export const typeDishReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TYPES_DISH:
            return {
                ...state,
                typesDish: action.payload
            }
        case ACTIVE_TYPE_DISH:
            return {
                ...state,
                activeDish: action.payload
            }
        default:
            return state
    }
}