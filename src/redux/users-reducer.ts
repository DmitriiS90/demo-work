import { InferActionsTypes, BaseThunkType } from './redux-store';
import { UserType } from './../types/types';
import { usersAPI } from "../api/users-api";

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

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const actions = {
    followSuccess: (userId: number) => { return { type: FOLLOW, userId } as const},
    unfollowSuccess: (userId: number) => { return { type: UNFOLLOW, userId } as const},
    setUsersAC: (users: Array<UserType>) => { return { type: SET_USERS, users } as const},
    setCurrentPageAC: (currentPage: number) => { return { type: SET_CURRENT_PAGE, currentPage } as const},
    setTotalUsersCountAC: (totalUsersCount: number) => { return { type: SET_TOTAL_USERS_COUNT, count: totalUsersCount } as const},
    toggleIsFetchingAC: (isFetching: boolean) => { return { type: TOGGLE_IS_FETCHING, isFetching } as const},
    toggleFollowingProgressAC: (isFetching: boolean, userId: number) => { return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } as const}
}

export const getUsersThunk = (currentPage: number, pageSize: number): ThunkType => {                
    return async (dispatch) => {     
        dispatch(actions.toggleIsFetchingAC(true));
        dispatch(actions.setCurrentPageAC(currentPage));

        let data = await usersAPI.getUsers(currentPage, pageSize)   
            dispatch(actions.toggleIsFetchingAC(false))
            dispatch(actions.setUsersAC(data.items))
            dispatch (actions.setTotalUsersCountAC (data.totalCount))
    }
}
export const followThunk = (userId: number):ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgressAC(true, userId))

    let response = await usersAPI.follow(userId)
    if (response.data.resultCode == 0) {
        dispatch(actions.followSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgressAC(false, userId))
}
export const unfollowThunk = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleFollowingProgressAC(true, userId))

    let response = await usersAPI.unfollow(userId)
    if (response.data.resultCode == 0) {
        dispatch(actions.unfollowSuccess(userId))
    }
    dispatch(actions.toggleFollowingProgressAC(false, userId))
}

export default usersReducer;