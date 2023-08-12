import {combineReducers} from "redux"
import { authReducer } from "./auth-reducer"
import {todoReducer} from "./todo-reducer"

export const rootReducer=combineReducers({
    authReducer,
    todoReducer
})