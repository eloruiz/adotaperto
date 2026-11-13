import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AbrigosPage } from './pages/AbrigosPage';
import { AnimalDetailPage } from './pages/AnimalDetailPage';
import { FavoritosPage } from './pages/FavoritosPage';
import { GuiaPage } from './pages/GuiaPage';
import { HistoriasPage } from './pages/HistoriasPage';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OrgDetailPage } from './pages/OrgDetailPage';
import { QueroAdotarPage } from './pages/QueroAdotarPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/abrigos" element={<AbrigosPage />} />
          <Route path="/animais/:id" element={<AnimalDetailPage />} />
          <Route path="/quero-adotar" element={<QueroAdotarPage />} />
          <Route path="/favoritos" element={<FavoritosPage />} />
          <Route path="/guia" element={<GuiaPage />} />
          <Route path="/historias" element={<HistoriasPage />} />
          <Route path="/organizacoes/:id" element={<OrgDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
