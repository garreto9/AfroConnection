import React from 'react';
import '../styles/PageHero.css';

function PageHero({ title, subtitle, image }) {
  const heroStyle = {
    backgroundImage: `url(${image})`
  };

  return (
    <section className="PageHero" style={heroStyle}>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="hero-content text-white">
              <h1 className="display-4 fw-bold mb-4">{title}</h1>
              <p className="lead">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
