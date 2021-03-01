/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { QueryContext } from "../contexts/QueryContext";
import '../styles/components/Characters.css';

export function Characters() {
    const { searchMarvelData, character, page, data, openCharacterModal } = useContext(QueryContext)

    useEffect(() => {
        console.log('teste');
        searchMarvelData();
    }, [character, page]);

    return (
        <div>
            <div className="character-label">Personagem</div>
            <div className="description-label">Descrição</div>
            <ul>
                {Array.isArray(data) && data.length ? (
                    data.map((ch) => (
                        <li key={ch.name}
                         onClick={() => openCharacterModal(ch.id)}>
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
        </div>
    )
}