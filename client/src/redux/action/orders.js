import {
    ORDERS_ADD,
    ORDER_ADD_DISH,
    ORDER_DELETE_DISH,
    SET_ORDERS,
    SET_ORDERS_SUCCESS,
    UPDATE_ORDERS,
} from '../consts';
import axios from 'axios';

export const getOrders = (sort = null) => {
    return async (dispatch) => {
        dispatch({ type: SET_ORDERS });
        const response = await axios.get(
            `http://localhost:5000/api/order${
                sort === 'date' ? '?sort=date' : sort === 'status' ? '?sort=status' : ''
            }`,
        );
        dispatch({
            type: SET_ORDERS_SUCCESS,
            payload: response.data,
        });
    };
};

export const createOrder = (
    statusOrderId,
    amountOfCost,
    dishes,
    typeOrder,
    prepareFor,
    numberTable,
) => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:5000/api/order', {
            statusOrderId,
            amountOfCost,
            dishes,
        });
        if (typeOrder == 1) {
            await axios.post('http://localhost:5000/api/takeawayorder', {
                orderId: response.data.id,
                prepareFor,
            });
        }
        if (typeOrder == 0) {
            await axios.post('http://localhost:5000/api/orderinthehall', {
                orderId: response.data.id,
                numberTable,
            });
        }
        dispatch({
            type: ORDERS_ADD,
            payload: response.data,
        });
    };
};

export const orderUpdate = (id, statusOrderId) => {
    return async (dispatch) => {
        const response = await axios.put('http://localhost:5000/api/order', { id, statusOrderId });
        dispatch({
            type: UPDATE_ORDERS,
            payload: response.data,
        });
    };
};

export const orderDeleteDish = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`http://localhost:5000/api/order/dish/${id}`);
        dispatch({
            type: ORDER_DELETE_DISH,
            payload: response.data,
        });
    };
};

export const orderDishAdd = (id, dishId) => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:5000/api/order/dish', { id, dishId });
        dispatch({
            type: ORDER_ADD_DISH,
            payload: response.data,
        });
    };
};
