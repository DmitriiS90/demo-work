import React, { useState } from 'react';
import styles from './News.module.css';
import cn from 'classnames'
import { Button } from 'antd';


const News = () => {
    const [editMode, setEditMode] = useState(true);

    return (
        <div>
            <button className={cn({[styles.active]:editMode})} onClick={()=>{setEditMode(true)}}>News</button>
            <button className={cn({[styles.active]:!editMode})} onClick={()=>{setEditMode(false)}}>Yes</button>
            <button className={cn({[styles.active]:!editMode})} onClick={()=>{setEditMode(false)}}>No</button>
        </div>
    )

}
export default News;