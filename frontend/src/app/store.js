import { configureStore } from '@reduxjs/toolkit'
import actionReducer from './feachers/action.slice'
import ResultReducer from './feachers/result/submissionres.slice'
import switchReducer from "../app/feachers/switchTab"
import userReducer from "./feachers/user/userDetails.slice"
import tokenReducer from "./feachers/user/token"

export const store = configureStore({
    reducer: {
        submit: actionReducer,
        result: ResultReducer,
        switchTab: switchReducer,
        user: userReducer,
        token: tokenReducer
    }
})