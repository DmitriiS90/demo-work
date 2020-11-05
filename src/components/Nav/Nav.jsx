import React from 'react';
import styles from'./Nav.module.css';
import { NavLink } from 'react-router-dom';



const Nav = (props) => {
    return <nav className={styles.nav}>
        <div className={styles.item}>
            <NavLink to='/profile'>Profile</NavLink>
        </div>
        <div className={styles.item}>
            <NavLink to='/dialogs' activeClassName={styles.gold}>Masseges</NavLink>
        </div>
        <div className={styles.item}>
            <NavLink to='/users'>Users</NavLink>
        </div>
        <div className={styles.item}>
            <NavLink to='/news'>News</NavLink>
        </div>
        <div className={styles.item}>
            <NavLink to='/music'>Music</NavLink>
        </div>
        <div className={styles.item}>
            <NavLink to='/settings'>Settings</NavLink>
        </div>
    </nav>
}
export default Nav;