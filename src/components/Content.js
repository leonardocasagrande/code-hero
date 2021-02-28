import { useContext } from 'react';
import '../styles/components/Content.css'
import { QueryContext } from '../contexts/QueryContext'
import { Characters } from './Characters';

export function Content(props) {
    const { character, setCharacter, setPage } = useContext(QueryContext);

    function handleChange(event) {
        setCharacter(event.target.value);
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
                    value={character} />
                <Characters />
            </div>
        </main>
    )
}