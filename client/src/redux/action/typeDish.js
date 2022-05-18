import axios from 'axios'
import { ACTIVE_TYPE_DISH, GET_TYPES_DISH } from '../consts'

export const getTypesDish = () => {
    return async dispatch => {
        const response = await axios.get('http://localhost:5000/api/dish/type')
        dispatch({
            type: GET_TYPES_DISH,
            payload: response.data
        })
    }
}

export const setActiveTypeDish = (id) => {
    return dispatch => {
        dispatch({
            type: ACTIVE_TYPE_DISH,
            payload: id
        })
    }
}