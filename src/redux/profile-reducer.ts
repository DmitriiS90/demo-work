import { InferActionsTypes, BaseThunkType } from './redux-store';
import { PostsType, ProfileType, PhotosType } from './../types/types'
import { stopSubmit } from "redux-form"
import { profileAPI } from "../api/profile-api"


const ADD_POST ='ADD-POST'                             
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'


let initialState = {                     
    posts: [
        { id: 1, message: 'Hello', likesCount: 12 },
        { id: 2, message: 'Hi', likesCount: 32 },
        { id: 3, message: 'How are you?', likesCount: 23 }
    ] as Array<PostsType>,
    newPostText: "" as string | null,
    profile: null as ProfileType | null,
    status: ""
}
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:{
            let newPost = {
                id: 7,
                message: action.newPostText,
                likesCount: 0
            };
            return{
                ...state,
                posts:[...state.posts, newPost],
                newPostText: ''
            }              
        }
        case SET_USER_PROFILE :{
            return{
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS :{
            return{
                ...state,
                status: action.status
            }
        }
        case DELETE_POST :{
            return{
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS :{
            return{
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;

    }
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>

export const actions = {
    addPostActionCreator: (newPostText:string) => { return { type: ADD_POST, newPostText } as const },
    setUserProfile: (profile: ProfileType) => { return { type: SET_USER_PROFILE, profile } as const },
    setStatus: (status: string) => { return { type: SET_STATUS, status } as const },
    deletePost: (postId: number) => { return { type: DELETE_POST, postId } as const },
    savePhotoSuccess: (photos: PhotosType) => { return { type: SAVE_PHOTO_SUCCESS, photos } as const }
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {             
    let response = await profileAPI.getProfile(userId)            
    
    dispatch (actions.setUserProfile(response.data)) 
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {         
    let response = await profileAPI.getStatus(userId)   
             
    dispatch (actions.setStatus(response.data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
};
export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos))
        }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId can not be null')
        }
    } else {
        dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;