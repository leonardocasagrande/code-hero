/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import '../styles/components/Paginator.css'

/**
 * 
 * @param {number} page Página atual 
 * @param {number} lastPage Última página de dados
 * @param {number} numberOfPages Numero de páginas requeridas
 */
function getPagesForView(page, lastPage, numberOfPages) {
    const pageTotal = lastPage > numberOfPages ? numberOfPages : lastPage;
    const result = [page];
    let i = 1;
    while (result.length < pageTotal) {
        //Se a página anterior à atual for maior que 1, adiciona.
        if (page - i >= 1) {
            result.push(page - i)
        }
        //Se a página posterior à atual for menor que a última, adiciona.
        if (page + i <= lastPage) {
            result.push(page + i);
        }
        i++;
    }
    //Ordena ascendentemente.
    return result.sort((a, b) => a - b);
}


/**
 * 
 * @param {Object} props Propriedades da paginação
 * @param {number} page Página atual da paginação
 * @param {function} setPage Função para definir a página atual
 * @param {number} maxPage Última página de dados
 */
export function Paginator(props) {
    /**
     * Atualiza o tamanho da tela de acordo com o tamanho obtido.
     */
    function updateSize() {
        const result = window.innerWidth < 600;
        if (result !== isMobile) {
            setIsMobile(result);
        }
    }
    //Variavel de controle de ser mobile
    const [isMobile, setIsMobile] = useState(false);
    
    //Quando monta, verifica o tamanho da tela e adiciona listener de alteração de tamanho.
    useEffect(() => {
        updateSize();
        window.addEventListener("resize", updateSize)
    }, []);
    //Quando desmonta, retira o listener de atualização de tela.
    useEffect(() => () => window.removeEventListener("resize", updateSize), [] );
    let content = null;
    //Verifica se existe a página e a última página
    if (props.page && props.maxPage) {
        content = (
            <>
                {props.page > 2 && (
                    <button onClick={() => props.setPage(1)} className='page-arrow-button'>
                        <i className='arrow left' />
                        <i className='arrow left' />
                    </button>
                )}
                {props.page > 1 && (
                    <button onClick={() => props.setPage(props.page - 1)} className='page-arrow-button'>
                        <i className='arrow left' />
                    </button>
                )}
                {/* Caso seja mobile, renderiza 3 páginas para seleção, caso contrário, 5 */}
                {getPagesForView(props.page, props.maxPage, isMobile ? 3 : 5).map((el) => {
                    let classes = 'page-button';
                    if (el === props.page) {
                        classes = classes.concat(' button-active');
                    }
                    return (
                        <button onClick={() => props.setPage(el)}
                            className={classes}
                            key={el}>{el}</button>)
                })}
                {props.page < props.maxPage && (
                    <button onClick={() => props.setPage(props.page + 1)} className='page-arrow-button'>
                        <i className='arrow right' />
                    </button>
                )}
                {props.page < props.maxPage - 1 && (
                    <button onClick={() => props.setPage(props.maxPage)} className='page-arrow-button'>
                        <i className='arrow right' />
                        <i className='arrow right' />
                    </button>
                )}
            </>

        )
    }

    return (
        <div className='paginator-container'>
            {content}
        </div>
    );
}