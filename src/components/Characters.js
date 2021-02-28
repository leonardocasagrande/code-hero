/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { QueryContext } from "../contexts/QueryContext"

export function Characters() {
    const { searchMarvelData, character, page, data } = useContext(QueryContext)

    useEffect(() => {
        console.log('teste');
        searchMarvelData();
    }, [character, page]);

    return (
        <ul>
            {Array.isArray(data) && data.length ? (
                data.map((ch) => (
                    <li key={ch.name}>
                        <img style={{ height: '50px' }}
                            src={`${ch.thumbnail.path}.${ch.thumbnail.extension}`}
                            alt={ch.name} />
                        <span>{ch.name}</span>
                    </li>
                )
                )
            ) : <li><span>Nenhum personagem encontrado</span></li>
            }
        </ul>
    )
}