import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames'

type Props = {
    totalItemsCount: number
    currentPage: number 
    pageSize: number 
    onPageChanged: (pageNumber: number) => void 
    portionsSize?: number
}

const Paginator: React.FC<Props> = ({totalItemsCount, currentPage, pageSize, onPageChanged, portionsSize=10, ...props}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil (pagesCount / portionsSize);  
    let [portionNumber, setportionNumber] = useState(1);
    let leftPortionPageNunber = (portionNumber - 1) * (portionsSize + 1); 
    let rightPortionPageNunber = portionNumber * (portionsSize + 1);

    return (
        <div className={cn(styles.paginator)}>
            {portionNumber > 1 &&
                <button onClick={() => { setportionNumber(portionNumber - 1) }}>PREV</button>
            }

            {pages
                .filter(p => p >= leftPortionPageNunber && p <= rightPortionPageNunber)
                .map(p => {
                    return <span className={cn({
                        [styles.selectPage]: currentPage === p
                    }, styles.pageNumber)}
                        key={p}
                        onClick={(e) => { onPageChanged(p) }}>{p}</span>
                })}

            {portionCount > portionNumber &&
                <button onClick={() => { setportionNumber(portionNumber + 1) }}>NEXT</button>
            }
        </div>
    )
}


export default Paginator;