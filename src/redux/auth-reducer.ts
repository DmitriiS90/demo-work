import { ResultCodeForCaptchaEnum } from './../api/api';
import { InferActionsTypes, BaseThunkType } from './redux-store';
import { stopSubmit } from "redux-form"
import { authAPI } from "../api/auth-api"
import { securityAPI } from "../api/security-api"
import { ResultCodeEnum} from "../api/api"

const SET_USER_DATA ='SET-USER-DATA'                             
const GET_CAPTCHA_URL_SUCCESS ='GET-CAPTCHA-URL-SUCCESS'                             

export type InitialStateType = typeof initialState

let initialState = {  
    id: null as number | null,                   
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
    
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

export const actions = {
    setAuthUserData: (id: number | null, email: string | null , login: string | null , isAuth: boolean) => {
        return { type: SET_USER_DATA, payload: { id, email, login, isAuth } as const}
    },
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return { type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} as const}
    }
}

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let response = await authAPI.me()                        
       
        if (response.data.resultCode === ResultCodeEnum.Success) {
            let {id, email, login} = response.data.data
            dispatch (actions.setAuthUserData(id, email, login, true) )   
        }
}
export const login = (email:string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
                            
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData())      
        } else {
            if(response.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some ERROR'; 
            dispatch(stopSubmit('login', {_error: message}))    
        }
};
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}
export const logout = (): ThunkType => async(dispatch) => {
    const response = await authAPI.logout();                  
        if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false))      
        }
}
export default authReducer;