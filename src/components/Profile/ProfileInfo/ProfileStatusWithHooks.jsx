import React, { useEffect, useState } from 'react';
import styles from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let activeEditMode = () => {
        setEditMode(true)
    } 
    let deActiveEditMode  = () => {
        setEditMode(false)
        props.updateStatus(status)               
    }
    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    
    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status:</b><span onDoubleClick={activeEditMode}>{props.status || 'No status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={deActiveEditMode} autoFocus={true}
                           value={status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;