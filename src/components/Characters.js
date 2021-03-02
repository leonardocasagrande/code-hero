/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { QueryContext } from "../contexts/QueryContext";
import '../styles/components/Characters.css';

export function Characters() {
    const { searchMarvelData, characterFilter, page, characterListData, openCharacterModal } = useContext(QueryContext)

    useEffect(() => {
        searchMarvelData();
    }, [characterFilter, page]);

    let content = <div className="loader">Loading...</div>
    if(characterListData) {
        content = (
            <ul>
                {Array.isArray(characterListData) && characterListData.length ? (
                    characterListData.map((ch) => (
                        <li key={ch.name} className="character-list-item"
                         onClick={() => openCharacterModal(ch)}>
                            <div className="character-container">
                                <img style={{ width: '50px' }}
                                    src={`${ch.thumbnail.path}.${ch.thumbnail.extension}`}
                                    alt={ch.name} />
                                <span>{ch.name}</span>
                            </div>
                            <div className="description-container">
                                <span>{ch.description}</span>
                            </div>
                        </li>
                    )
                    )
                ) : <li><span>Nenhum personagem encontrado</span></li>
                }
            </ul>
        )
    }

    return (
        <div>
            <div className="character-label">Personagem</div>
            <div className="description-label">Descrição</div>
            {content}
        </div>
    )
}