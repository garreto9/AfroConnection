import React from 'react';
import '../styles/CulturePage.css';
import PageHero from '../components/PageHero'; 
import heroImage from '../assets/images/conscienia-negra.jpeg';
import historiaImage from '../assets/images/cultura.avif';
import lutaImage from '../assets/images/igualdade.jpg';
import educacaoImage from '../assets/images/educacao.jpg';
import expoImage from '../assets/images/miniatura-expo-consciencia-negra.jpg.png';
import museuImage from '../assets/images/museu-afro.jpg';
import festivalImage from '../assets/images/MARCA-AFROFESTIVAL.png';


const eventos = [
  {
    img: expoImage,
    title: "IV EXPO INTERNACIONAL DIA DA CONSCIÊNCIA NEGRA",
    description: "Um espaço de reflexão, aprendizado e celebração da diversidade cultural preta da capital Paulista e do Brasil.",
    link: "https://distritoanhembi.com.br/events/iv-expo-internacional-dia-da-consciencia-negra/"
  },
  {
    img: museuImage,
    title: "MUSEU AFRO BRASIL EMANOEL ARAUJO",
    description: "Um museu histórico, artístico e etnológico, voltado à pesquisa, conservação e exposição de objetos relacionados ao universo cultural do negro no Brasil.",
    link: "http://www.museuafrobrasil.org.br/visite/planeje-sua-visita/entrada-e-horario-de-funcionamento"
  },
  {
    img: festivalImage,
    title: "RECÔNCAVO AFRO FESTIVAL",
    description: "Destaca a vibrante produção artística e cultural contemporânea da região do Recôncavo da Bahia, com uma programação diversificada.",
    link: "https://www.reconcavoafrofestival.com/"
  }
];

function EventCard({ img, title, description, link }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="event-card">
        <img src={img} alt={title} className="img-fluid rounded-top" />
        <div className="p-4">
          <h4>{title}</h4>
          <p className="mb-3">{description}</p>
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Saiba Mais</a>
        </div>
      </div>
    </div>
  );
}


function CulturaPage() {
  return (
    <>
      <PageHero
        title="Nossa Cultura"
        subtitle="Celebrando a riqueza e diversidade da cultura afro-brasileira através da arte, música, dança e história."
        image={heroImage}
      />

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img src={historiaImage} alt="História Afro-Brasileira" className="img-fluid rounded shadow" />
            </div>
            <div className="col-lg-6">
              <h2 className="display-5 mb-4">Nossa História</h2>
              <p className="lead">A história e a cultura afro-brasileira são fundamentais para a formação da identidade nacional, refletindo séculos de resistência, criatividade e contribuições em diversas áreas.</p>
              <h5>Contribuições Culturais</h5>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Música: Gêneros como o samba e o maracatu.</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Dança: A capoeira, que combina luta e dança.</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Religião: Cultos como o candomblé e a umbanda.</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Culinária: Pratos como o acarajé, vatapá e feijoada.</li>
              </ul>
            </div>
          </div>

          <div className="row align-items-center mb-5">
            <div className="col-lg-6 order-lg-2 mb-4 mb-lg-0">
              <img src={lutaImage} alt="Luta por direitos" className="img-fluid rounded shadow" />
            </div>
            <div className="col-lg-6 order-lg-1">
              <h2 className="display-5 mb-4">Resistência e Luta</h2>
              <p className="lead">A população negra no Brasil sempre esteve engajada em movimentos de resistência contra a opressão. Os quilombos são exemplos históricos. Atualmente, movimentos sociais continuam a lutar por igualdade racial e reconhecimento.</p>
            </div>
          </div>

          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img src={educacaoImage} alt="Educação e Reconhecimento" className="img-fluid rounded shadow" />
            </div>
            <div className="col-lg-6">
              <h2 className="display-5 mb-4">Reconhecimento</h2>
              <p className="lead">O reconhecimento levou à implementação de políticas educacionais que promovem o ensino da história e cultura afro-brasileira nas escolas (Lei nº 10.639/2003). A valorização é essencial para compreender a diversidade da sociedade brasileira.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-6 mb-4">Eventos Culturais</h2>
              <p className="lead">Fique por dentro dos eventos e celebrações culturais que acontecem ao redor do Brasil.</p>
            </div>
            {eventos.map((evento, index) => (
              <EventCard key={index} {...evento} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default CulturaPage;
