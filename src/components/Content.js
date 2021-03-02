import { useContext } from 'react';
import '../styles/components/Content.css'
import { QueryContext } from '../contexts/QueryContext'
import { Characters } from './Characters';
import {Paginator} from './Paginator';

export function Content() {
    const { characterFilter, setCharacterFilter, setPage, page, maxPage } = useContext(QueryContext);

    function handleChange(event) {
        setCharacterFilter(event.target.value);
        setPage(1);
    }

    return (
        <main className='content-container'>
            <div>
                <h1>Busca de personagens</h1>
                <label>Nome do personagem</label>
                <input type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    value={characterFilter} />
                <Characters />
                <Paginator page={page} setPage={setPage} maxPage={maxPage} />
            </div>
            
        </main>
    )
}