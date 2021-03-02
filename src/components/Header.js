import '../styles/components/Header.css';

/**
 * Componente de cabeçalho
 */
export function Header() {
    return (
        <header className='header-container'>
            <img src="/logo.svg" alt="Objective" />
            <div>
                <div>
                    <span className='name-container'>Leonardo Casagrande</span>
                    <span>Teste de Front End</span>
                </div>
                <span className='picture-container'>LC</span>
            </div>
        </header>
    );
}