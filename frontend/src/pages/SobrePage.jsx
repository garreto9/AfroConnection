import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sobre.css';
import PageHero from '../components/PageHero';
import heroImage from '../assets/images/sobre.avif';
import historiaImage from '../assets/images/sobre-historia.jpg';

function MissionCard({ icon, title, text }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="mission-card p-4 bg-white rounded shadow-sm text-center h-100">
                <i className={`bi ${icon} display-4 text-primary mb-3`}></i>
                <h3 className="h4 mb-3">{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    );
}

function BenefitCard({ icon, title, items }) {
    return (
        <div className="col-md-6">
            <div className="benefit-card p-4 bg-white rounded shadow-sm h-100">
                <h4><i className={`bi ${icon} me-2 text-primary`}></i>{title}</h4>
                <ul className="list-unstyled mt-3">
                    {items.map((item, index) => (
                        <li key={index} className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


function SobrePage() {
  return (
    <>
      <PageHero
        title="Quem Somos"
        subtitle="Conheça nossa história, missão e o impacto que buscamos criar na comunidade."
        image={heroImage}
      />

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center mb-5 pb-4">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img src={historiaImage} alt="Nossa História" className="img-fluid rounded shadow" />
            </div>
            <div className="col-lg-6">
              <h2 className="display-6 mb-4">Nossa História</h2>
              <p className="lead">A AfroConnection nasceu do desafio de criar uma solução com o tema proposto pela Recode Pro AI 2024, que resultou no desenvolvimento deste site com a finalidade de criar um espaço dedicado ao desenvolvimento e fortalecimento da comunidade negra no Brasil.</p>
            </div>
          </div>

          <div className="row mb-5 pb-4">
            <div className="col-12 text-center mb-5">
              <h2 className="display-6">Missão e Valores</h2>
              <p className="lead">Nossos princípios fundamentais que guiam nossas ações</p>
            </div>
            <MissionCard icon="bi-bullseye" title="Missão" text="Promover o desenvolvimento profissional, cultural e pessoal da comunidade negra, criando oportunidades reais de crescimento e conexão." />
            <MissionCard icon="bi-eye" title="Visão" text="Ser a principal plataforma de desenvolvimento e conexão para a comunidade negra no Brasil, impactando positivamente a vida de milhares de pessoas." />
            <MissionCard icon="bi-heart" title="Valores" text="Comprometimento com a igualdade, respeito à diversidade, excelência em nossas ações e transparência em tudo que fazemos." />
          </div>

          <div className="row mb-5 pb-4">
            <div className="col-12">
              <h2 className="display-6 text-center mb-5">O Que Proporcionamos</h2>
              <div className="row g-4">
                <BenefitCard icon="bi-mortarboard" title="Desenvolvimento Profissional" items={['Cursos e capacitações gratuitos', 'Mentoria com profissionais experientes', 'Conexão com empresas parceiras']} />
                <BenefitCard icon="bi-people" title="Networking Qualificado" items={['Eventos de networking', 'Comunidade ativa de profissionais', 'Grupos de discussão e apoio']} />
                <BenefitCard icon="bi-book" title="Valorização Cultural" items={['Eventos culturais', 'Preservação da história e tradições', 'Promoção de artistas e criadores']} />
                <BenefitCard icon="bi-heart" title="Suporte Integral" items={['Apoio psicológico', 'Orientação profissional', 'Acompanhamento personalizado']} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <div className="bg-primary text-white p-5 rounded">
                <h2 className="h3 mb-4">Faça Parte da Nossa Comunidade</h2>
                <p className="lead mb-4">Junte-se a milhares de pessoas que já fazem parte da AfroConnection</p>
                <NavLink to="/login" className="btn btn-light btn-lg">Cadastre-se Gratuitamente</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SobrePage;
