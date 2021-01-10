import axios from 'axios'
import { UserType, ProfileType } from './../types/types'

export const instance = axios.create(
    {
        withCredentials: true,
        baseURL: `https://social-network.samuraijs.com/api/1.0/`,
        headers: { 'API-KEY': 'c79fa325-f895-4b38-87f8-be88f765c262' }
    })

  
export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}
export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type ResponseType <D={}, RC = ResultCodeEnum>= {
    data: D
    resultCode: RC
    messages:Array<string>
}


