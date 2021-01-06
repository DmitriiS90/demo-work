import React from 'react';
import Users from './Users';
import Preloader from '../common/preloader/preloader';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUsersThunk, followThunk, unfollowThunk} from '../../redux/users-reducer';
import { getPageSize, getTotalUsersCount,getCurrentPage,getIsFetching,getFollowingInProgress, getUsers } from '../../redux/user-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapDispatchPropsType = {
    followThunk:(userId: number) => void
    unfollowThunk:(userId: number) => void
    getUsersThunk: (currentPage: number, pageSize: number) => void
}
type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    followingInProgress: Array<number>
    users: Array<UserType>
}
type Props = MapDispatchPropsType & MapStatePropsType

class UsersContainer extends React.Component<Props> {
    componentDidMount() {              
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)  
    }
    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunk(pageNumber , this.props.pageSize)
    }
    render() {                                           
        return <> 
            {this.props.isFetching ? <Preloader /> : null}           
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollowThunk}
                follow={this.props.followThunk}
                followingInProgress={this.props.followingInProgress} />
        </>
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),            
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose (
    withAuthRedirect,
    connect (mapStateToProps, { followThunk, unfollowThunk, getUsersThunk }),             
) (UsersContainer)

