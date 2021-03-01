import { Content } from './components/Content';
import { Header } from './components/Header';
import { Paginator } from './components/Paginator';
import { QueryProvider } from './contexts/QueryContext';

function App() {
  return (
    <QueryProvider>
      <Header />
      <Content />
      <Paginator />
    </QueryProvider>
  );
}

export default App;
