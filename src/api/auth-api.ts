import { instance, ResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum } from './api'

type MeResponseDataType = {
        id: number
        email: string
        login: string
}

type LoginResponseDataType = {
        id: number
}

export const authAPI = {
    me(){
        return instance.get <ResponseType <MeResponseDataType> >(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null){
        return instance.post <ResponseType <LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum> >(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout(){
        return instance.delete(`auth/login`)
    },
}



