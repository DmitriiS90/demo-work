import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZATED ='SET-INITIALIZATED';                             

let initialState = {  
    initializated: false
}


const appReducer = (state = initialState, action) => {
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

export const initializatedSuccess = () => { return {type: SET_INITIALIZATED}};


export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    
    Promise.all([promise])
    .then(() => {
        dispatch(initializatedSuccess())
    })

};


export default appReducer