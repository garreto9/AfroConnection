import React from "react";
import Jeffson from '../assets/images/Jeffson.jpeg';
import Isadora from '../assets/images/Isadora.jpeg';
import Maryelly from '../assets/images/Maryelly.jpeg';
// import { FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/ContatoPage.css';

const teamMembers = [
  {
    name: 'Jeffson Garreto',
    photo: Jeffson ,
    intro: 'Atuo na integração de soluções seguras, aplicando conhecimentos em proteção de dados, controle de acesso e mitigação de vulnerabilidades, buscando garantir a robustez e confiabilidade dos sistemas.',
    linkedin: 'https://www.linkedin.com/in/jeffsongarreto/',
    github: 'https://github.com/jeffsongarreto' 
    
  },
  {
    name: 'Isadora de Leão',
    photo: Isadora ,
    intro: 'Atuo como Analista de Segurança da Informação, contribuindo com minhas habilidades em infraestrutura, automação, cloud e pentest para fortalecer a proteção de sistemas e dados corporativos.',
    linkedin: 'https://www.linkedin.com/in/isaleaomoreira/' ,
    github: 'https://github.com/Isleony'

  },
  {
    name: 'Maryelly Faustino',
    photo: Maryelly ,
    intro: 'Em transição de carreira, ampliando conhecimentos em HTML, CSS e JavaScript para construir interfaces intuitivas e responsivas. Apaixonada por design e usabilidade.',
    linkedin: 'https://www.linkedin.com/in/maryelly-faustino-28a8071b8/', 
    github: 'https://github.com/MaryellyFaustino'
  }
];

function ContatoPage() {
  return (
    <section className="team-section">
      <h2>Nossa Equipe de Desenvolvimento</h2>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.photo} alt={member.name} className="member-photo" />
            <h3>{member.name}</h3>
            <p>{member.intro}</p>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <i class="bi bi-linkedin text-primary me-1"></i> LinkedIn
            </a>
            <br />
            <a href={member.github} target="_blank" rel="noopener noreferrer">
                <i class="bi bi-github text-dark me-1"></i>  GitHub 
            </a>         
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContatoPage;