import React from 'react';
import styles from './Users.module.css';
import User from './user';
import Paginator from '../common/Paginator/Paginator';

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, ...props}) => {
    return (
        <div>
            <Paginator currentPage={currentPage}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                onPageChanged={onPageChanged} />
            <div>
                {
                    props.users.map(u => <User user={u}
                        key={u.id}
                        folowingInProgress={props.folowingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow} />)


                }
            </div>
        </div>
    )
}


export default Users;