import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-subtitle">Oops! Página não encontrada.</p>
        <p>A página que você está procurando pode ter sido removida ou não existe.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
