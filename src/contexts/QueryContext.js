import { createContext, useState } from "react";
import md5 from 'md5';


export const QueryContext = createContext({})

export function QueryProvider({ children }) {

    const maxItemsPerPage = 10;
    const [character, setCharacter] = useState('');
    const [limitPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    async function searchMarvelData() {
        const offset = (page - 1) * maxItemsPerPage;
        const PRIV_KEY = 'ea002a9e5d0c3f81ae14623ad6bbd98edfbae1d8';
        const PUBLIC_KEY = '831701ac2cddfb2903bd19f00aa27627';
        const url = 'https://gateway.marvel.com:443/v1/public/characters?apikey=831701ac2cddfb2903bd19f00aa27627';
        const ts = new Date().getTime();
        const hash = md5(ts + PRIV_KEY + PUBLIC_KEY);
        let fullUrl = `${url}&hash=${hash}&ts=${ts}&offset=${offset}&limit=${maxItemsPerPage}`;
        if (character) {
            fullUrl = fullUrl + '&nameStartsWith=' + character;
        }
        const res = await fetch(fullUrl);
        const teste = await res.json();
        if (teste) {
            setData(teste.data.results);
        }
        console.log(data);
    }

    return (
        <QueryContext.Provider value={{
            character,
            page,
            limitPerPage,
            data,
            setCharacter,
            setPage,
            searchMarvelData
        }}>
            {children}
        </QueryContext.Provider>
    )
}