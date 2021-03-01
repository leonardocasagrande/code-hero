import { useContext } from "react";
import { QueryContext } from "../contexts/QueryContext";
import '../styles/components/CharacterModal.css';

export function CharacterModal() {
    const { characterComicData } = useContext(QueryContext);
    let content = <p>Loading</p>
    if (characterComicData) {
        content = (
            <div>
                <ul>
                    {characterComicData.map((el) => (
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
        <div className='modal-overlay' >
            <div className='modal-container'>
                {content}
            </div>
        </div>
    );
}