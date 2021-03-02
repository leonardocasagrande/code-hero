/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import '../styles/components/Paginator.css'

function getPagesForView(page, maxPage, numberOfPages) {
    const pageTotal = maxPage > numberOfPages ? numberOfPages : maxPage;
    const result = [page];
    let i = 1;
    while (result.length < pageTotal) {
        if (page - i >= 1) {
            result.push(page - i)
        }
        if (page + i <= maxPage) {
            result.push(page + i);
        }
        i++;
    }
    return result.sort((a, b) => a - b);
}



export function Paginator(props) {
    function updateSize() {
        const result = window.innerWidth < 600;
        if (result !== isMobile) {
            setIsMobile(result);
        }
    }
    const [isMobile, setIsMobile] = useState(false);
    updateSize();
    useEffect(() => window.addEventListener("resize", updateSize), []);
    useEffect(() => () => window.removeEventListener("resize", updateSize), [] );
    let content = null;
    if (props.page && props.maxPage) {
        content = (
            <>
                {props.page > 2 && (
                    <button onClick={() => props.setPage(1)} className='page-arrow-button'>
                        <i className='arrow left' />
                        <i className='arrow left' />
                    </button>
                )}
                {props.page > 1 && (
                    <button onClick={() => props.setPage(props.page - 1)} className='page-arrow-button'>
                        <i className='arrow left' />
                    </button>
                )}
                {getPagesForView(props.page, props.maxPage, isMobile ? 3 : 5).map((el) => {
                    let classes = 'page-button';
                    if (el === props.page) {
                        classes = classes.concat(' button-active');
                    }
                    return (
                        <button onClick={() => props.setPage(el)}
                            className={classes}
                            key={el}>{el}</button>)
                })}
                {props.page < props.maxPage && (
                    <button onClick={() => props.setPage(props.page + 1)} className='page-arrow-button'>
                        <i className='arrow right' />
                    </button>
                )}
                {props.page < props.maxPage - 1 && (
                    <button onClick={() => props.setPage(props.maxPage)} className='page-arrow-button'>
                        <i className='arrow right' />
                        <i className='arrow right' />
                    </button>
                )}
            </>

        )
    }

    return (
        <div className='paginator-container'>
            {content}
        </div>
    );
}