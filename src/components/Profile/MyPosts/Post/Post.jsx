import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
    return (
        <div className={styles.item}>
            <div>
                <span>{props.likesCount}</span>
            </div>
            <div>
                <img src='https://avatars.mds.yandex.net/get-pdb/1655359/523fff70-896c-4166-b041-161e1b53dce8/s1200?webp=false' />
                {props.message}
            </div>
        </div>

    )
}
export default Post; 