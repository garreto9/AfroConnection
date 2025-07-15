import React from "react";
import '../styles/PrivacidadePage.css';

const privacySections = [
  {
    id: 1,
    icon: "bi-shield-lock-fill icon-intro",
    title: "Nossa Política",
    content: "Nosso compromisso é garantir a privacidade dos seus dados pessoais. Esta política explica como coletamos, usamos e protegemos suas informações."
  },
  {
    id: 2,
    icon: "bi-database-fill icon-data",
    title: "Dados Coletados",
    content: (
      <ul>
        <li>Dados pessoais fornecidos voluntariamente: nome, email, etc.</li>
        <li>Dados coletados automaticamente: cookies, endereço IP e logs de acesso.</li>
        <li>Informações enviadas por meio de formulários e cadastros.</li>
      </ul>
    )
  },
  {
    id: 3,
    icon: "bi-people-fill icon-sharing",
    title: "Compartilhamento de Dados",
    content: "Seus dados podem ser compartilhados com parceiros confiáveis e provedores de serviços, sempre sob contratos que garantem confidencialidade e segurança."
  },
  {
    id: 4,
    icon: "bi-person-badge-fill icon-rights",
    title: "Direitos dos Usuários",
    content: (
      <ul>
        <li>Você pode acessar, corrigir, excluir ou portar seus dados a qualquer momento.</li>
        <li>É possível retirar seu consentimento para o tratamento dos dados.</li>
        <li>Para exercer seus direitos, entre em contato conosco.</li>
      </ul>
    )
  },
  {
    id: 5,
    icon: "bi-person-check-fill icon-children",
    title: "Privacidade de Crianças",
    content: "Não coletamos dados pessoais de menores de 13 anos sem consentimento dos responsáveis. Recomendamos que pais e responsáveis supervisionem o uso do site por crianças."
  },
  {
    id: 6,
    icon: "bi-arrow-repeat icon-changes",
    title: "Alterações na Política de Privacidade",
    content: "Podemos atualizar esta política periodicamente para refletir mudanças na legislação ou em nossos processos. Quaisquer alterações importantes serão comunicadas claramente aos usuários."
  }
];

function PrivacidadePage() {
  return (
    <section className="privacy-section">
      <h1 className="privacy-title">Política de Privacidade</h1>
      <p className="privacy-intro">
        Abaixo você encontra as informações detalhadas sobre como tratamos seus dados:
      </p>

      <div className="privacy-container">
        {privacySections.map(({ id, icon, title, content }) => (
          <article key={id} className="privacy-card">
            <header>
              <i className={`bi ${icon} icon`}></i>
              <h2>{title}</h2>
            </header>
            <div className="privacy-content">{content}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PrivacidadePage;