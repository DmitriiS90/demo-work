import {createStore, combineReducers, applyMiddleware, Action} from 'redux'
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware from 'redux-thunk'  
import { ThunkAction } from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'

const reducers = combineReducers({              
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app:appReducer
});

type reducerType = typeof reducers
export type AppStateType = ReturnType<reducerType>

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertiesType<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction <R, AppStateType, unknown, A>

const store = createStore(reducers, applyMiddleware(thunkMiddleware))  

// @ts-ignore
window.store = store

export default store