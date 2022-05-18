import axios from 'axios'
import { GET_STATUS } from '../consts'

export const statusOrderGet = () => {
    return async dispatch => {
        const response = await axios.get('http://localhost:5000/api/statusorder')
        dispatch({
            type: GET_STATUS,
            payload: response.data
        })
    }
}