import { useContext } from 'react';
import '../styles/components/Content.css'
import { AppContext } from '../contexts/AppContext'
import { CharacterList } from './CharacterList';
import {Paginator} from './Paginator';

/**
 * Componente de agrupamento de conteúdo principal
 */
export function Content() {
    //Obtém o filtro de nome, setter de filtro de nome, página, setter de página e página máxima.
    const { characterFilter, setCharacterFilter, setPage, page, maxPage } = useContext(AppContext);

    /**
     * Handler de alteração no input de filtro de nome de personagem.
     * @param {event} event 
     */
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
                <CharacterList />
                <Paginator page={page} setPage={setPage} maxPage={maxPage} />
            </div>
        </main>
    )
}