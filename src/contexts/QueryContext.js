import { createContext, useState } from "react";
import md5 from 'md5';
import { CharacterModal } from "../components/CharacterModal";


export const QueryContext = createContext({})

export function QueryProvider({ children }) {

    const maxItemsPerPage = 10;
    const [character, setCharacter] = useState('');
    const [characterComicData, setCharacterComicData] = useState(null);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);


    const PRIV_KEY = 'ea002a9e5d0c3f81ae14623ad6bbd98edfbae1d8';
    const PUBLIC_KEY = '831701ac2cddfb2903bd19f00aa27627';
    const url = 'https://gateway.marvel.com:443/v1/public/characters';
    
    function generateApiUrl(characterId, type) {
        const ts = new Date().getTime();
        const hash = md5(ts + PRIV_KEY + PUBLIC_KEY);
        let fullUrl = url;
        if(characterId) {
            fullUrl = `${fullUrl}/${characterId}/${type}`;
        }
        return `${fullUrl}?apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hash}`
    }

    async function searchMarvelData() {
        const url = generateApiUrl();
        const offset = (page - 1) * maxItemsPerPage;
        let fullUrl = `${url}&offset=${offset}&limit=${maxItemsPerPage}`;
        if (character) {
            fullUrl = fullUrl + '&nameStartsWith=' + character;
        }
        const res = await fetch(fullUrl);
        const teste = await res.json();
        setMaxPage(Math.ceil(teste.data.total / maxItemsPerPage));
        if (teste) {
            setData(teste.data.results);
        }
    }

    function openCharacterModal(characterId) {
        fetchCharacterComicsData(characterId);
        setIsCharacterModalOpen(true);
    }

    async function fetchCharacterComicsData(characterId) {
        const fullUrl = generateApiUrl(characterId, 'comics');
        const res = await fetch(fullUrl);
        const teste = await res.json();
        if(teste) {
            setCharacterComicData(teste.data.results)
        }
    }

    return (
        <QueryContext.Provider value={{
            character,
            page,
            data,
            maxPage,
            characterComicData,
            setCharacter,
            setPage,
            searchMarvelData,
            openCharacterModal
        }}>
            {children}
            { isCharacterModalOpen && <CharacterModal />}
        </QueryContext.Provider>
    )
}