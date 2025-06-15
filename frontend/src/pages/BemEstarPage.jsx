import React from 'react';
import '../styles/bem-estar.css';
import PageHero from '../components/PageHero';
import heroImage from '../assets/images/saude.avif';
import cvvImage from '../assets/images/cvv-img.png';
import inegImage from '../assets/images/ineg.png';
import spaImage from '../assets/images/spa.jpg';
import afroSaudeImage from '../assets/images/Logo_AfroSaúde.jpg';

function SupportSection({ image, title, description, link }) {
  return (
    <div className="row align-items-center mb-5">
      <div className="col-lg-6 mb-4 mb-lg-0">
        <img src={image} alt={title} className="img-fluid rounded shadow" />
      </div>
      <div className="col-lg-6">
        <h2 className="display-6 mb-4">{title}</h2>
        <p className="lead">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">Clique Aqui Para Acessar</a>
      </div>
    </div>
  );
}

function WellnessCard({ icon, title, text }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="wellness-card p-4 bg-white rounded shadow-sm text-center h-100">
                <i className={`bi ${icon} display-4 text-primary mb-3`}></i>
                <h3 className="h4 mb-3">{title}</h3>
                <p className="mb-4">{text}</p>
                <button className="btn btn-outline-primary mt-auto">Participar</button>
            </div>
        </div>
    );
}

function BemEstarPage() {
  return (
    <>
      <PageHero
        title="Bem-estar Mental"
        subtitle="Cuidando da saúde mental e promovendo o equilíbrio emocional da nossa comunidade."
        image={heroImage}
      />

      <section className="py-5">
        <div className="container">
          <SupportSection
            image={cvvImage}
            title="Centro de Valorização da Vida"
            description="Serviço voluntário gratuito de apoio emocional e prevenção do suicídio para todas as pessoas que querem e precisam conversar, sob total sigilo e anonimato, disponível 24h pelo telefone 188."
            link="https://cvv.org.br/"
          />
          <SupportSection
            image={inegImage}
            title="Instituto do Negro de Alagoas"
            description="Oferece serviços psicológicos gratuitos ou com valor social à população negra vítima de violência racial em Alagoas, além de fomentar uma rede de psicólogos negros que atuem com uma clínica racializada."
            link="https://inegalagoas.org/"
          />
          <SupportSection
            image={spaImage}
            title="Social Psico Afro"
            description="Plataforma on-line que permite conexão entre profissionais de psicologia regularizados e pacientes onde quer que eles estejam e em qualquer horário, com segurança e qualidade."
            link="https://www.socialpsicoafro.com.br/"
          />
          <SupportSection
            image={afroSaudeImage}
            title="AfroSaúde"
            description="Conecta pacientes a profissionais negros de saúde e bem-estar em todo o Brasil, com soluções de saúde com objetivos sociais e organizacionais, e uma atenção especial à população negra."
            link="https://afrosaude.com.br/home"
          />

          <div className="row mb-5">
            <div className="col-12 text-center mb-5">
              <h2 className="display-6">Programas de Bem-estar</h2>
              <p className="lead">Atividades e práticas para promover saúde mental e equilíbrio</p>
            </div>
            <WellnessCard icon="bi-peace" title="Meditação" text="Práticas guiadas para redução de estresse e ansiedade." />
            <WellnessCard icon="bi-people" title="Grupos de Apoio" text="Encontros semanais para compartilhar experiências e fortalecer laços." />
            <WellnessCard icon="bi-journal-text" title="Workshops" text="Encontros educativos sobre saúde mental e autocuidado." />
          </div>
        </div>
      </section>

      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="h3 mb-4">Precisa de ajuda imediata?</h2>
          <p className="lead mb-4">Se você ou alguém que você conhece está em crise, ligue para o CVV</p>
          <a href="tel:188" className="btn btn-light btn-lg">
            <i className="bi bi-telephone me-2"></i>Ligar 188
          </a>
        </div>
      </section>
    </>
  );
}

export default BemEstarPage;
