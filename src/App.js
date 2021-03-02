import { Content } from './components/Content';
import { Header } from './components/Header';
import { QueryProvider } from './contexts/QueryContext';

function App() {
  return (
    <QueryProvider>
      <Header />
      <Content />
    </QueryProvider>
  );
}

export default App;
