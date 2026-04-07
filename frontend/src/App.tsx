import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Listagem from './pages/Listagem';
import Cadastro from './pages/Cadastro';
import Detalhes from './pages/Detalhes';

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      
      <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Listagem />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/editar/:id" element={<Cadastro />} />
          <Route path="/detalhes/:id" element={<Detalhes />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;