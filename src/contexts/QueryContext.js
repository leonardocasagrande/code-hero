import { createContext, useState } from "react";
import md5 from 'md5';
import { CharacterModal } from "../components/CharacterModal";


export const QueryContext = createContext({})

export function QueryProvider({ children }) {

    const maxItemsPerPage = 10;
    const [characterFilter, setCharacterFilter] = useState('');
    const [characterData, setCharacterData] = useState(null);
    const [characterAppearancesData, setCharacterAppearancesData] = useState(null);
    const [characterListData, setCharacterListData] = useState(null);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [modalPage, setModalPage] = useState(1);
    const [modalMaxPage, setModalMaxPage] = useState(1);
    const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);


    const PRIV_KEY = process.env.REACT_APP_PRIV_KEY;
    const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
    const URL = process.env.REACT_APP_BASE_URL;

    function generateApiUrl(characterId, type) {
        const ts = new Date().getTime();
        const hash = md5(ts + PRIV_KEY + PUBLIC_KEY);
        let fullUrl = URL;
        if (characterId) {
            fullUrl = `${fullUrl}/${characterId}/${type}`;
        }
        return `${fullUrl}?apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hash}`
    }

    async function searchMarvelData() {
        setCharacterListData(null);
        setMaxPage(null);
        const url = generateApiUrl();
        const offset = (page - 1) * maxItemsPerPage;
        let fullUrl = `${url}&offset=${offset}&limit=${maxItemsPerPage}`;
        if (characterFilter) {
            fullUrl = fullUrl + '&nameStartsWith=' + characterFilter;
        }
        const res = await fetch(fullUrl);
        const data = await res.json();
        setMaxPage(Math.ceil(data.data.total / maxItemsPerPage));
        setCharacterListData(data.data.results);

    }

    function closeCharacterModal() {
        setCharacterData(null);
        setCharacterAppearancesData(null);
        setIsCharacterModalOpen(false);
    }

    function openCharacterModal(character) {
        if (window.innerWidth < 600) {
            window.scrollTo(0, 0);
        }
        setCharacterData(character);
        fetchCharacterAppearencesData(character.id, 'comics');
        setIsCharacterModalOpen(true);
    }

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
        <QueryContext.Provider value={{
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
            searchMarvelData,
            openCharacterModal,
            closeCharacterModal,
            fetchCharacterAppearencesData
        }}>
            {children}
            { isCharacterModalOpen && <CharacterModal />}
        </QueryContext.Provider>
    )
}