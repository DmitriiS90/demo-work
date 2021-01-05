import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZATED ='SET-INITIALIZATED';                             

export type InitialStateType = {
    initializated: boolean
}

let initialState: InitialStateType = {  
    initializated: false
}


const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializatedSuccessActionType = {
    type: typeof SET_INITIALIZATED
}

export const initializatedSuccess = ():InitializatedSuccessActionType => { return {type: SET_INITIALIZATED}};


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    
    Promise.all([promise])
    .then(() => {
        dispatch(initializatedSuccess())
    })

};


export default appReducer