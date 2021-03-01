import { useContext } from "react";
import { QueryContext } from "../contexts/QueryContext";
import '../styles/components/CharacterModal.css';

export function CharacterModal() {
    const { characterData, closeCharacterModal } = useContext(QueryContext);
    let content = <div class="loader">Loading...</div>
    if (characterData) {
        content = (
            <div>
                <img style={{ width: '50px' }}
                                    src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`}
                                    alt={characterData.name} />
                <h1>{characterData.name}</h1>
                <p>{characterData.description}</p>
                <ul>
                    {characterData.results.map((el) => (
                        <li>
                            <img style={{ width: '50px' }}
                                    src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
                                    alt={el.title} />
                            <span>{el.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div className='modal-overlay' onClick={closeCharacterModal}>
            <div className='modal-container'>
                {content}
                <button type="button" onClick={closeCharacterModal}>
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
            </div>
        </div>
    );
}