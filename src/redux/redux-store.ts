import {createStore, combineReducers, applyMiddleware} from 'redux'
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware from 'redux-thunk'  
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

const store = createStore(reducers, applyMiddleware(thunkMiddleware))  


// @ts-ignore
window.store = store

export default store