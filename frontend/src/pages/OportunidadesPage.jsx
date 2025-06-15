import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api';
import '../styles/oportunidades.css';

import PageHero from '../components/PageHero';
import heroImage from '../assets/images/oportunidades.avif';

function JobSearchForm({ searchTerm, onSearchChange, selectedArea, onAreaChange }) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="row mb-5">
            <div className="col-lg-10 mx-auto">
                <div className="search-box p-4 bg-white rounded shadow-sm">
                    <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
                        <div className="col-lg-6">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar por cargo ou palavra-chave..." 
                                value={searchTerm}
                                onChange={onSearchChange}
                            />
                        </div>
                        <div className="col-lg-4">
                            <select 
                                className="form-select"
                                value={selectedArea}
                                onChange={onAreaChange}
                            >
                                <option value="">Todas as áreas</option>
                                <option value="Tecnologia">Tecnologia</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Vendas">Vendas</option>
                                <option value="Recursos Humanos">Recursos Humanos</option>
                            </select>
                        </div>
                        <div className="col-lg-2">
                            <button type="submit" className="btn btn-primary w-100">Buscar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function JobCard({ title, company, location, tags, link }) {
  return (
    <div className="job-card p-4 bg-white rounded shadow-sm mb-4">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h3 className="h4 mb-2">{title}</h3>
          <p className="company mb-2"><i className="bi bi-building me-2"></i>{company}</p>
          <p className="location mb-3"><i className="bi bi-geo-alt me-2"></i>{location}</p>
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-light text-dark me-2">{tag}</span>
            ))}
          </div>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary ms-3">Acessar</a>
      </div>
    </div>
  );
}

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="bg-white p-4 rounded shadow-sm mb-4">
                <h4 className="mb-4">Recursos para Carreira</h4>
                <ul className="list-unstyled">
                    <li className="mb-3">
                        <a href="https://www.linkedin.com/pulse/como-adaptar-seu-curr%C3%ADculo-para-passar-pela-michelle-navarro-slfrf/" target="_blank" rel="noopener noreferrer" className="text-decoration-none resource-link">
                            <i className="bi bi-file-text me-2 text-primary"></i>
                            Como fazer um currículo impactante
                        </a>
                    </li>
                    <li className="mb-3">
                        <a href="https://www.gupy.io/blog/dicas-entrevista-online" target="_blank" rel="noopener noreferrer" className="text-decoration-none resource-link">
                            <i className="bi bi-camera-video me-2 text-primary"></i>
                            Dicas para entrevistas online
                        </a>
                    </li>
                    <li className="mb-3">
                        <a href="https://www.ciadetalentos.com.br/blog/5-formas-de-otimizar-seu-perfil-no-linkedin/" target="_blank" rel="noopener noreferrer" className="text-decoration-none resource-link">
                            <i className="bi bi-linkedin me-2 text-primary"></i>
                            Otimize seu LinkedIn
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function OportunidadesPage() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  // Função para buscar os dados do backend
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get('/oportunidades');
      setAllJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      setError('Não foi possível carregar as vagas. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca os dados quando o componente é montado
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Filtra as vagas localmente sempre que um filtro muda
  useEffect(() => {
    let jobs = allJobs;

    if (searchTerm) {
      jobs = allJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedArea) {
      jobs = jobs.filter(job => 
        job.tags.map(tag => tag.toLowerCase()).includes(selectedArea.toLowerCase())
      );
    }

    setFilteredJobs(jobs);
  }, [searchTerm, selectedArea, allJobs]);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-5"><div className="spinner-border text-primary" role="status"></div><p className="mt-2">Carregando vagas...</p></div>;
    }
    if (error) {
      return <div className="text-center p-5 alert alert-danger">{error}</div>;
    }
    if (filteredJobs.length === 0 && !loading) {
        return <div className="text-center p-5 bg-light rounded"><h5>Nenhuma vaga encontrada.</h5><p>Tente ajustar seus filtros de busca.</p></div>
    }
    return filteredJobs.map((job) => <JobCard key={job.id} {...job} />);
  };

  return (
    <>
      <PageHero
        title="Oportunidades"
        subtitle="Conectando talentos a oportunidades de trabalho e desenvolvimento profissional."
        image={heroImage}
      />
      <section className="py-5">
        <div className="container">
          <JobSearchForm 
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            selectedArea={selectedArea}
            onAreaChange={(e) => setSelectedArea(e.target.value)}
          />
          <div className="row">
            <div className="col-lg-8">
              {renderContent()}
            </div>
            <div className="col-lg-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OportunidadesPage;
