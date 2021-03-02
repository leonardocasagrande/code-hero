/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import md5 from 'md5';
import { CharacterModal } from "../components/CharacterModal";


export const AppContext = createContext({})

/**
 * Context API do app
 * @param {component} children Componente React a ser englobado pelo provider
 */
export function AppProvider({ children }) {
    //Numero maximo de itens por pagina;
    const maxItemsPerPage = 10;
    //Filtro do nome do personagem;
    const [characterFilter, setCharacterFilter] = useState('');
    //Dados do personagem;
    const [characterData, setCharacterData] = useState(null);
    //Dados de aparições do personagem.
    const [characterAppearancesData, setCharacterAppearancesData] = useState(null);
    //Lista de personagens;
    const [characterListData, setCharacterListData] = useState(null);
    //Página atual da busca de personagens.
    const [page, setPage] = useState(1);
    //Última página da busca de personagens.
    const [maxPage, setMaxPage] = useState(1);
    //Página atual da modal de personagem;
    const [modalPage, setModalPage] = useState(1);
    //Última página da modal de personagens.
    const [modalMaxPage, setModalMaxPage] = useState(1);
    //Se a modal de personagem está aberta.
    const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);


    //Caso altere o filtro de nome, ou a página, busca as informações de 
    useEffect(() => {
        fetchCharacterList();
    }, [characterFilter, page]);

    //Obtém variáveis da API do .env
    const PRIV_KEY = process.env.REACT_APP_PRIV_KEY;
    const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
    const URL = process.env.REACT_APP_BASE_URL;

    /**
     * Gera a URL da chamada da API da Marvel.
     * @param {number} characterId 
     * @param {string} type 
     */
    function generateApiUrl(characterId, type) {
        //Obtém timestamp.
        const ts = new Date().getTime();
        //Gera o hash MD5 com timestamp, e chaves da API
        const hash = md5(ts + PRIV_KEY + PUBLIC_KEY);
        let fullUrl = URL;
        //Se for passado o ID do personagem e tipo.
        if (characterId && type) {
            //Concatena o ID e o tipo
            fullUrl = `${fullUrl}/${characterId}/${type}`;
        }
        //Concatena as informações
        return `${fullUrl}?apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hash}`
    }

    /**
     * Busca a lista de personagens
     */
    async function fetchCharacterList() {
        setCharacterListData(null);
        setMaxPage(null);
        //Gera a url.
        const url = generateApiUrl();
        //Define o offset com base na página, e itens máximo por pagina.
        const offset = (page - 1) * maxItemsPerPage;
        //Concatena
        let fullUrl = `${url}&offset=${offset}&limit=${maxItemsPerPage}`;
        //Se existir filtro de nome.
        if (characterFilter) {
            //Concatena na URL.
            fullUrl = fullUrl + '&nameStartsWith=' + characterFilter;
        }
        //Obtém resposta, e dados.
        const res = await fetch(fullUrl);
        const data = await res.json();
        //Define a página final como o total pelo numero maximo de itens, arredondado para cima.
        setMaxPage(Math.ceil(data.data.total / maxItemsPerPage));
        setCharacterListData(data.data.results);

    }

    /**
     * Fecha a modal de personagem.
     */
    function closeCharacterModal() {
        setCharacterData(null);
        setCharacterAppearancesData(null);
        setIsCharacterModalOpen(false);
    }

    /**
     * Abre a modal de personagem, carregando as informações do personagem selecionado.
     * @param {object} character Objeto de personagem.
     */
    function openCharacterModal(character) {
        if (window.innerWidth < 600) {
            window.scrollTo(0, 0);
        }
        setCharacterData(character);
        fetchCharacterAppearencesData(character.id, 'comics');
        setIsCharacterModalOpen(true);
    }

    /**
     * Obtém as informações de aparições do personagem, com base no tipo passado.
     * @param {number} characterId ID do personagem
     * @param {string} type Tipo de consulta.
     */
    async function fetchCharacterAppearencesData(characterId, type) {
        setCharacterAppearancesData(null);
        setModalMaxPage(null);
        const offset = (modalPage - 1) * maxItemsPerPage;
        let fullUrl = `${generateApiUrl(characterId, type)}&offset=${offset}&limit=${maxItemsPerPage}`;
        switch (type) {
            case 'comics' || 'series':
                fullUrl = `${fullUrl}&orderBy=title`
                break;
            case 'events':
                fullUrl = `${fullUrl}&orderBy=name`
                break;
            default:
        }
        const res = await fetch(fullUrl);
        const data = await res.json();
        setCharacterAppearancesData(data.data.results);
        setModalMaxPage(Math.ceil(data.data.total / maxItemsPerPage));
    }

    return (
        <AppContext.Provider value={{
            characterFilter,
            page,
            modalPage,
            characterListData,
            maxPage,
            modalMaxPage,
            characterData,
            characterAppearancesData,
            setCharacterFilter,
            setPage,
            setModalPage,
            openCharacterModal,
            closeCharacterModal,
            fetchCharacterAppearencesData
        }}>
            {children}
            { isCharacterModalOpen && <CharacterModal />}
        </AppContext.Provider>
    )
}