import React from 'react';
import styles from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    let path = '/Dialogs/' + props.id
    return (
        <div className={styles.dialog + ' ' + styles.active}>
            <NavLink to={path}><img src={props.avatar}/>{props.name}</NavLink>
        </div>
    )
};


export default DialogItem;