import { useContext, useState } from "react";
import { QueryContext } from "../contexts/QueryContext";
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



export function Paginator() {
    function updateSize() {
        const result = window.innerWidth < 600;
        if(result !== isMobile) {
            setIsMobile(result);
        }        
    }
    const { page, setPage, maxPage } = useContext(QueryContext);
    const [isMobile, setIsMobile] = useState(false);    
    updateSize();
    window.addEventListener("resize", updateSize)
    let buttons = null;
    if (page && maxPage) {
        buttons = (
            getPagesForView(page, maxPage, isMobile ? 3 : 5).map((el) => {
                let classes = 'page-button';
                if (el === page) {
                    classes = classes.concat(' button-active');
                }
                return (
                    <button onClick={() => setPage(el)}
                        className={classes}
                        key={el}>{el}</button>)
            })
        )
    }

    return (
        <div className='paginator-container'>
            {page > 2 && (
                <button onClick={() => setPage(1)} className='page-arrow-button'>
                    <i className='arrow left' />
                    <i className='arrow left' />
                </button>
            )}
            {page > 1 && (
                <button onClick={() => setPage(page - 1)} className='page-arrow-button'>
                    <i className='arrow left' />
                </button>
            )}
            {buttons}
            {page < maxPage && (
                <button onClick={() => setPage(page + 1)} className='page-arrow-button'>
                    <i className='arrow right' />
                </button>
            )}
            {page < maxPage - 1 && (
                <button onClick={() => setPage(maxPage)} className='page-arrow-button'>
                    <i className='arrow right' />
                    <i className='arrow right' />
                </button>
            )}

        </div>
    );
}