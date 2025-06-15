import React from 'react';
import '../styles/features.css';

const featuresData = [
  { icon: 'bi-book', title: 'Cultura', text: 'Explore a riqueza da nossa história e tradições culturais.' },
  { icon: 'bi-mortarboard', title: 'Capacitações', text: 'Cursos e treinamentos para desenvolvimento profissional.' },
  { icon: 'bi-briefcase', title: 'Oportunidades', text: 'Vagas de emprego e oportunidades de crescimento.' },
  { icon: 'bi-heart', title: 'Bem-estar Mental', text: 'Suporte e recursos para saúde mental.' }
];

function FeatureCard({ icon, title, text }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="feature-card">
        <i className={`bi ${icon} display-4 mb-3`}></i>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="features py-5">
      <div className="container">
        <div className="row g-4">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
