import React from 'react';
import '../styles/hero.css';
import heroImage from '../assets/images/afro.jpeg';

function Hero() {
  const heroStyle = {
    backgroundImage: `url(${heroImage})`
  };

  return (
    <section className="hero" style={heroStyle}>
      <div className="hero-overlay"></div>
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-lg-6">
            <div className="hero-content text-white">
              <p className="display-6 mb-4">
                Conectando, fortalecendo e celebrando a comunidade negra. Um espaço de apoio, oportunidades e valorização da nossa cultura.
              </p>
              <a href="/sobre" className="btn btn-primary btn-lg">Saiba Mais</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
