import { useContext } from "react";
import { QueryContext } from "../contexts/QueryContext";
import '../styles/components/Paginator.css'

export function Paginator() {

    const { page, setPage, maxPage } = useContext(QueryContext)
    return (
        <div className='paginator-container'>
            <button className='page-button'>1</button>
            <button className='page-button'>2</button>
            <button className='page-button'>3</button>
            <button className='page-button'>4</button>
            <button className='page-button'>5</button>
        </div>
    );
}