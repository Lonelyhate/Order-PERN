import { DISH_ADD, DISH_CHANGE, DISH_REMOVE, SET_DISH, SET_DISH_SUCCESS } from "../consts";

const initialState = {
    dishes: [],
    loading: false,
    error: null
}

export const dishReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DISH:
            return {
                ...state,
                loading: true
            }
        case SET_DISH_SUCCESS:
            return {
                ...state,
                loading: false,
                dishes: action.payload
            }
        case DISH_ADD:
            return {
                ...state,
                loading: false,
                dishes: [...state.dishes, action.payload]
            }
        case DISH_REMOVE:
            return {
                ...state,
                loading: false,
                dishes: [...state.dishes.filter(item => item.id !== action.payload)]
            }
        case DISH_CHANGE:
            return {
                ...state,
                loading: false,
                dishes: [...state.dishes.map(item => item.id == action.payload.id ? action.payload : item)]
            }
        default:
            return state
    }
}