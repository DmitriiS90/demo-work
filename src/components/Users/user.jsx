import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user2.jpg'
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

let User = ({user, folowingInProgress, unfollow, follow, ...props}) => {
    return ( 
        <div>
            {
                    <div key={user.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                                </NavLink>
                            </div>
                            <div>
                                {user.followed
                                    ? <Button disabled={folowingInProgress.some(id => id === user.id)} onClick={() => {     
                                        unfollow(user.id)
                                    }} type="primary" ghost>unFOllOW</Button>

                                    : <Button disabled={folowingInProgress.some(id => id === user.id)} onClick={() => {
                                        follow(user.id)
                                    }} type="primary" ghost>FOllOW</Button>}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </span>
                            <span>
                                <div>{"user.location.country"}</div>
                                <div>{"user.location.city"}</div>
                            </span>
                        </span>
                    </div>
            }
        </div>
    )
}


export default User;