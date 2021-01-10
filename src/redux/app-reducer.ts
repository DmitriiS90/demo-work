import { InferActionsTypes } from './redux-store';
import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZATED ='SN/APP/SET-INITIALIZATED';                             

export type InitialStateType = {
    initializated: boolean
}

let initialState: InitialStateType = {  
    initializated: false
}

type ActionType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZATED:
            return {
                ...state,
                initializated: true
            }
        default:
            return state;
    }
    
}

export const actions = {
    initializatedSuccess: () => { return {type: SET_INITIALIZATED} as const }
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    
    Promise.all([promise])
    .then(() => {
        dispatch(actions.initializatedSuccess())
    })

};


export default appReducer