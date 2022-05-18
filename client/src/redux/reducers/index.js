import {combineReducers} from 'redux'
import { dishReducer } from './dishReducer'
import { typeDishReducer } from './typeDishReducer'
import { statusOrderReducer } from './statusOrderReducer'
import { ordersReducer } from './ordersReducer'

const rootReducer = combineReducers({
    dishReducer,
    typeDishReducer,
    statusOrderReducer,
    ordersReducer
})

export default rootReducer