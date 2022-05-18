import {
    ORDERS_ADD,
    ORDER_ADD_DISH,
    ORDER_DELETE_DISH,
    SET_ORDERS,
    SET_ORDERS_SUCCESS,
    UPDATE_ORDERS,
} from '../consts';

const initialState = {
    orders: [],
    loading: false,
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                loading: true,
            };
        case SET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case ORDERS_ADD:
            return {
                ...state,
                loading: false,
                orders: [action.payload, ...state.orders],
            };
        case UPDATE_ORDERS:
            return {
                ...state,
                loading: false,
                orders: [
                    ...state.orders.map((item) =>
                        item.id == action.payload.id ? action.payload : item,
                    ),
                ],
            };
        case ORDER_DELETE_DISH:
            return {
                ...state,
                loading: false,
                orders: [
                    ...state.orders.map((item) =>
                        item.id == action.payload.id ? action.payload : item,
                    ),
                ],
            };
        case ORDER_ADD_DISH:
            return {
                ...state,
                loading: false,
                orders: [
                    ...state.orders.map((item) =>
                        item.id == action.payload.id ? action.payload : item,
                    ),
                ],
            };
        default:
            return state;
    }
};
