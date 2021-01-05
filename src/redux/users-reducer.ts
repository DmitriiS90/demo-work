import { UserType } from './../types/types';
import { usersAPI } from "../api/api";

const FOLLOW ='FOLLOW';                             
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';


let initialState = {                     
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 1000,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users ids
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,                         
                 users: state.users.map( u => {                  
                    if(u.id===action.userId){
                        return {...u, followed: true}
                     }
                    return u
                } )    
            }
        case UNFOLLOW:
            return {
                ...state,                          
                users: state.users.map( u => {                  
                    if(u.id===action.userId){
                        return {...u, followed: false}
                    }
                    return u
                } )    
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                 followingInProgress: action.isFetching
                  ? [...state.followingInProgress, action.userId]
                  : state.followingInProgress.filter(id => id !== action.userId)
                }
        default:
            return state;
    }
    
}
type FollowActionCreatorType = {
    type: typeof FOLLOW
    userId: number
}
export const followAC = (userId: number): FollowActionCreatorType => { return { type: FOLLOW, userId } }

type UnFollowActionCreatorType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowAC = (userId: number): UnFollowActionCreatorType => { return {type: UNFOLLOW, userId } }

type SetUsersActionCreatorType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsersAC = (users: Array<UserType>):SetUsersActionCreatorType => { return {type: SET_USERS, users } }

type SetCurrentPageActionCreatorType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number):SetCurrentPageActionCreatorType => { return {type: SET_CURRENT_PAGE, currentPage } }

type SetTotalUsersCountActionCreatorType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCountAC = (totalUsersCount: number):SetTotalUsersCountActionCreatorType => { return {type: SET_TOTAL_USERS_COUNT, count: totalUsersCount} }

type ToggleIsFetchingActionCreatorType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionCreatorType => { return {type: TOGGLE_IS_FETCHING, isFetching} }

type ToggleFollowingProgressActionCreatorType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgressAC = (isFetching: boolean, userId: number):ToggleFollowingProgressActionCreatorType => { return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} }



export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {                
    return async (dispatch: any) => {     
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(currentPage));

        let data = await usersAPI.getUsers(currentPage, pageSize)   
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(data.items))
            dispatch (setTotalUsersCountAC (data.totalCount))
    }
}

export const followThunk = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowingProgressAC(true, userId))

    let response = await usersAPI.follow(userId)
    if (response.data.resultCode == 0) {
        dispatch(followAC(userId))
    }
    dispatch(toggleFollowingProgressAC(false, userId))
}
export const unfollowThunk = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowingProgressAC(true, userId))

    let response = await usersAPI.unfollow(userId)
    if (response.data.resultCode == 0) {
        dispatch(unfollowAC(userId))
    }
    dispatch(toggleFollowingProgressAC(false, userId))
}

export default usersReducer;