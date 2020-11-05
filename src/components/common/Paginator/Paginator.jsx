import React, { useState } from 'react';
import styles from './Paginator.module.css';

let Paginator = ({totalUsersCount, currentPage, pageSize, onPageChanged, portionsSize=10, ...props}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil (pagesCount / portionsSize);  
    let [portionNumner, setPortionNumner] = useState(1);
    let leftPortionPageNunber = (portionNumner - 1) * (portionsSize + 1); 
    let rightPortionPageNunber = portionNumner * (portionsSize + 1);

    return (
        <div className={styles.paginator}>
            {portionNumner > 1 &&
                <button onClick={() => { setPortionNumner(portionNumner - 1) }}>PREV</button>
            }

            {pages
                .filter(p => p >= leftPortionPageNunber && p <= rightPortionPageNunber)
                .map(p => {
                    return <span className={({
                        [styles.selectPage]: currentPage === p
                    }, styles.pageNumber)}
                        key={p}
                        onClick={(e) => { onPageChanged(p) }}>{p}</span>
                })}

            {portionCount > portionNumner &&
                <button onClick={() => { setPortionNumner(portionNumner + 1) }}>NEXT</button>
            }
        </div>
    )
}


export default Paginator;