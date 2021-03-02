/**
 * Componente de div de personagem na lista
 * @param {Object} props Propriedados do personagem
 * @param {string} name Nome do personagem
 * @param {function} clickedHandler Ação a ser executada no clique da seção do personagem
 * @param {Object} thumbnail Objeto de imagem de thumbnail do personagem
 * @param {string} path Caminho da imagem
 * @param {string} extension Extensão da imagem
 * @param {string} description Descrição do personagem
 */
export function Character(props) {
    return (
        <li key={props.name} className="character-list-item"
        onClick={props.clickedHandler}>
           <div className="character-container">
               <img style={{ width: '50px' }}
                   src={`${props.thumbnail.path}.${props.thumbnail.extension}`}
                   alt={props.name} />
               <span>{props.name}</span>
           </div>
           <div className="description-container">
               <span>{props.description}</span>
           </div>
       </li>
    )
}

