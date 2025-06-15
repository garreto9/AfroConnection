import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api';
import '../styles/capacitacoes.css';

import PageHero from '../components/PageHero';
import heroImage from '../assets/images/aprender-com-as-vozes-negras.png';
import mentoriaImage from '../assets/images/gettyimages.png';
import webDevImage from '../assets/images/sobre.avif';
import businessImage from '../assets/images/negocios.jpeg';
import marketingImage from '../assets/images/marketing.jpg';

const imageMap = {
  "sobre.avif": webDevImage,
  "negocios.jpeg": businessImage,
  "marketing.jpg": marketingImage
};

function CourseCardSkeleton() {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="course-card skeleton-card">
        <div className="skeleton-image"></div>
        <div className="p-4">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-text"></div>
          <div className="skeleton-line skeleton-text-short"></div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ image, badge, title, description, details }) {
  const imageUrl = imageMap[image] || webDevImage;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="course-card">
        <div className="course-image-container">
          <img src={imageUrl} alt={title} className="img-fluid" />
          <span className="course-badge">{badge}</span>
        </div>
        <div className="course-content p-4">
          <h3>{title}</h3>
          <p>{description}</p>
          <ul className="course-details list-unstyled">
            {details.map((detail, index) => (
              <li key={index}><i className={`bi ${detail.icon} me-2`}></i>{detail.text}</li>
            ))}
          </ul>
          <button className="btn btn-primary w-100 mt-auto">Acesse ao Curso</button>
        </div>
      </div>
    </div>
  );
}

function CapacitacoesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get('/capacitacoes');
      setCourses(data);
    } catch (err) {
      setError('Não foi possível carregar os cursos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 3 }).map((_, index) => <CourseCardSkeleton key={index} />);
    }

    if (error) {
      return (
        <div className="col-12 text-center p-5 bg-white rounded shadow-sm">
          <h5><i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>Ocorreu um Erro</h5>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchCourses}>Tentar Novamente</button>
        </div>
      );
    }

    if (courses.length === 0) {
      return <div className="col-12 text-center"><p>Nenhum curso disponível no momento.</p></div>;
    }
    
    return courses.map((course) => <CourseCard key={course.id} {...course} />);
  };

  return (
    <>
      <PageHero
        title="Capacitações"
        subtitle="Desenvolvendo talentos e construindo carreiras através de educação e treinamento de qualidade."
        image={heroImage}
      />

      <section className="py-5">
        <div className="container">
          <h2 className="text-center display-6 mb-5">Cursos Disponíveis para Inscrição</h2>
          <div className="row g-4">
            {renderContent()}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img src={mentoriaImage} alt="Mentoria" className="img-fluid rounded shadow" />
            </div>
            <div className="col-lg-6">
              <h2 className="display-6 mb-4">Programa de Mentoria</h2>
              <p className="lead mb-4">Conectamos você com profissionais experientes que irão guiar sua jornada profissional.</p>
              <ul className="list-unstyled">
                <li className="mb-3"><i className="bi bi-check-circle-fill text-primary me-2"></i>Mentoria personalizada</li>
                <li className="mb-3"><i className="bi bi-check-circle-fill text-primary me-2"></i>Networking qualificado</li>
                <li className="mb-3"><i className="bi bi-check-circle-fill text-primary me-2"></i>Desenvolvimento de carreira</li>
              </ul>
              <button className="btn btn-primary btn-lg">Participar do Programa</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CapacitacoesPage;
