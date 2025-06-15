import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './styles/App.css';

// Layout & Rotas
import Navbar from './components/navbar';
import Footer from './components/footer';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas Públicas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CulturePage from './pages/CulturePage';
import CapacitacoesPage from './pages/CapacitacoesPage';
import OportunidadesPage from './pages/OportunidadesPage';
import BemEstarPage from './pages/BemEstarPage';
import SobrePage from './pages/SobrePage';

// Páginas Protegidas
import AccountSettingsPage from './pages/AccountSettingsPage';

// Páginas de Admin
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageJobsPage from './pages/ManageJobsPage';
import ManageUsersPage from "./pages/ManageUsersPage";
import ManageCoursesPage from "./pages/ManageCoursesPage";

import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cultura" element={<CulturePage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/bem-estar" element={<BemEstarPage />} />

            {/* --- Rotas Protegidas (Apenas para usuários logados) --- */}
            <Route element={<ProtectedRoute />}>
              <Route path="/capacitacoes" element={<CapacitacoesPage />} />
              <Route path="/oportunidades" element={<OportunidadesPage />} />
              <Route path="/settings" element={<AccountSettingsPage />} />
            </Route>

            {/* --- Rotas de Admin (Apenas para usuários com role 'admin') --- */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminDashboardPage />}>
                <Route index element={<Navigate to="vagas" replace />} />
                <Route path="vagas" element={<ManageJobsPage />} />
                <Route path="usuarios" element={<ManageUsersPage />} />
                <Route path="cursos" element={<ManageCoursesPage />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
