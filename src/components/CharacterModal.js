/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import '../styles/components/CharacterModal.css';
import { Paginator } from "./Paginator";

/**
 * Componente de modal de informações de personagem.
 */
export function CharacterModal() {
    //Define o estado de tipo ativo.
    const [activeType, setActiveType] = useState('comics');
    //Desabilita o scroll do body no mount.
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);
    //Obtém as informações necessárias do contexto
    const { characterData,
        characterAppearancesData,
        fetchCharacterAppearencesData,
        closeCharacterModal,
        modalPage,
        setModalPage,
        modalMaxPage } = useContext(AppContext);

    /**
     * Handler de alteração de tab de visualização de dados, que atualiza o tipo ativo.
     * @param {string} type 
     */
    function tabChangeHandler(type) {
        if (type !== activeType) {
            setModalPage(1);
            setActiveType(type);
        }
    }

    /**
     * Obtém os dados de aparições de personagem, caso altere a página ou o tipo ativo.
     */
    useEffect(() => {
        fetchCharacterAppearencesData(characterData.id, activeType);
    }, [modalPage, activeType])

    //Define a lista de tabs com o tipo, e texto a ser exibido.
    const tabs = [{
        type: 'comics',
        text: 'HQ'
    }, {
        type: 'events',
        text: 'Eventos'
    },
    {
        type: 'series',
        text: 'Séries'
    }]

    //Define inicialmente o conteúdo como um spinner.
    let content = <div className="loader">Loading...</div>
    //Se existir conteúdo a exibir.
    if (characterAppearancesData) {
        content = (
            <ul>
                {/* Mapeia as informações de aparição de personagem em lista */}
                {Array.isArray(characterAppearancesData) && characterAppearancesData.length ? (
                    characterAppearancesData.map((el) => (
                        <li key={el.id} className="character-appearance-li">
                            <img style={{ width: '50px' }}
                                src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
                                alt={el.title} />
                            <span>{el.title}</span>
                        </li>
                    ))
                ) : <li className="character-appearance-li"><span>Nenhum registro encontrado</span></li>}
            </ul>
        )
    }

    return (
        <div className='modal-overlay' >
            <div className='modal-container'>
                <div>
                    {/* Informações do personagem */}
                    <div className="character-info">
                        <img style={{ width: '50px', marginRight: '1rem' }}
                            src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`}
                            alt={characterData.name} />
                        <h2>{characterData.name}</h2>
                    </div>
                    <p>{characterData.description}</p>
                    <div className="character-modal-tabs">
                        {
                            // Mapeia as tabs
                            tabs.map((el) => {
                                let classes = 'character-modal-tab';
                                if (activeType === el.type) {
                                    classes = classes.concat(' active');
                                }
                                return (
                                    <button
                                        key={el.type}
                                        className={classes}
                                        onClick={() => tabChangeHandler(el.type)}>
                                        {el.text}
                                    </button>
                                )
                            })
                        }
                    </div>
                    {content}
                </div>
                <button type="button" onClick={closeCharacterModal}
                    className="close-button">
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
                <Paginator page={modalPage} setPage={setModalPage} maxPage={modalMaxPage} />
            </div>
        </div>
    );
}