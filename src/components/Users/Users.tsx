import React from 'react';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import { UserType } from '../../types/types';

type Props = {
    totalUsersCount: number
    currentPage: number 
    pageSize: number 
    onPageChanged: (pageNumber: number) => void 
    users: Array<UserType>
    followingInProgress: Array<number>
    follow:(userId: number) => void
    unfollow:(userId: number) => void
}


let Users: React.FC<Props> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users,...props}) => {
    return (
        <div>
            <Paginator currentPage={currentPage}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged} />
            <div>
                {
                    users.map(u => <User user={u}
                        key={u.id}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow} />)


                }
            </div>
        </div>
    )
}


export default Users;