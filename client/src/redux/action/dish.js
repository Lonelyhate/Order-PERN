import axios from "axios"
import { DISH_ADD, DISH_CHANGE, DISH_REMOVE, SET_DISH, SET_DISH_SUCCESS } from "../consts"

export const getDishes = (typeDish) => {
    return async dispatch => {
        dispatch({type: SET_DISH})
        const response = await axios.get(`http://localhost:5000/api/dish${typeDish !== 0 ? `?dishTypeId=${typeDish}` : ''}`)
        dispatch({
            type: SET_DISH_SUCCESS,
            payload: response.data
        })
    }
}

export const addDish = (name, cost, weight, dishTypeId) => {
    return async dispatch => {
        const response = await axios.post('http://localhost:5000/api/dish', {name, cost, weight, dishTypeId})
        dispatch({
            type: DISH_ADD,
            payload: response.data
        })
    }
}

export const dishRemove = (id) => {
    return async dispatch => {
        const response = await axios.delete(`http://localhost:5000/api/dish/${id}`)
        dispatch({
            type: DISH_REMOVE,
            payload: id
        })
    }
}

export const dishChange = (id, name = null, cost = null, weight = null) => {
    return async dispatch => {
        const response = await axios.put('http://localhost:5000/api/dish', {id, name, cost, weight})
        dispatch({
            type: DISH_CHANGE,
            payload: response.data
        })
    }
}