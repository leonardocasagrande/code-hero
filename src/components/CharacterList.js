import { useContext } from "react"
import { AppContext } from "../contexts/AppContext";
import '../styles/components/Characters.css';
import { Character } from "./Character";

/**
 * Componente de lista de personagens.
 */
export function CharacterList() {
    const { characterListData, openCharacterModal } = useContext(AppContext)

    //Define inicialmente como um spinner
    let content = <div className="loader">Loading...</div>
    //Se existir lista de personagens
    if(characterListData) {
        content = (
            <ul>
                {/* Mapeia numa lista de componentes Personagem */}
                {Array.isArray(characterListData) && characterListData.length ? (
                    characterListData.map((ch) => (
                        <Character
                            key={ch.id} 
                            name={ch.name}
                            description={ch.description}
                            thumbnail={ch.thumbnail}
                            clickedHandler={() => openCharacterModal(ch)}
                        />
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