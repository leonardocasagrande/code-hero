import { Content } from './components/Content';
import { Header } from './components/Header';
import { AppProvider } from './contexts/AppContext';

/**
 * Componente pai do aplicativo
 */
function App() {
  return (
    <AppProvider>
      <Header />
      <Content />
    </AppProvider>
  );
}

export default App;
