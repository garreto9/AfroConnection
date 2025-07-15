import React from "react";
import '../styles/TermosPage.css'

function TermosPage() {
   return (
    <section className="terms-section">
      <h1>Termos de Uso</h1>
      <p className="intro">
        Ao acessar e utilizar este site, você concorda com os termos descritos abaixo. Caso não concorde, solicitamos que não utilize nossos serviços.
      </p>

      <div className="terms-container">

        <article className="term-card">
          <header>
            <i className="bi bi-check-circle-fill icon icon-accept"></i>
            <h2>Aceitação dos Termos</h2>
          </header>
          <p>Ao acessar e usar o site, o usuário concorda com os termos. Se não concordar, deve parar de usar o site.</p>
        </article>

        <article className="term-card">
          <header>
            <i className="bi bi-shield-lock-fill icon icon-usage"></i>
            <h2>Uso do Site</h2>
          </header>
          <p>O site deve ser usado de forma adequada. É proibido:</p>
          <ul>
            <li>Usar para fins ilegais ou proibidos pela legislação vigente.</li>
            <li>Violar direitos de terceiros (copyright, marcas, etc).</li>
            <li>Tentar acessar áreas restritas ou sistemas indevidamente.</li>
            <li>Enviar vírus ou códigos maliciosos.</li>
          </ul>
        </article>

        <article className="term-card">
          <header>
            <i className="bi bi-person-circle icon icon-account"></i>
            <h2>Conta de Usuário</h2>
          </header>
          <p>
            O usuário é responsável pela segurança e confidencialidade da sua conta e senha. Caso identifique uso não autorizado, deve informar imediatamente.
          </p>
        </article>

        <article className="term-card">
          <header>
            <i className="bi bi-file-earmark-text-fill icon icon-content"></i>
            <h2>Conteúdo do Usuário</h2>
          </header>
          <p>
            O usuário deve respeitar regras para conteúdos enviados. O site pode remover conteúdos inadequados. A propriedade intelectual do conteúdo enviado permanece do usuário, salvo acordo em contrário.
          </p>
        </article>

        <article className="term-card">
          <header>
            <i className="bi bi-exclamation-triangle-fill icon icon-liability"></i>
            <h2>Limitação de Responsabilidade</h2>
          </header>
          <p>
            O site não se responsabiliza por danos diretos ou indiretos. Não garante disponibilidade ou funcionamento sem erros.
          </p>
        </article>

        <article className="term-card">
          <header>
            <i className="bi bi-arrow-repeat icon icon-changes"></i>
            <h2>Modificações no Serviço e Termos</h2>
          </header>
          <p>
            O site pode modificar ou interromper o serviço a qualquer momento. Alterações nos termos serão comunicadas aos usuários.
          </p>
        </article>

        <article className="term-card">
          <header>
            <i className="bi bi-x-circle-fill icon icon-termination"></i>
            <h2>Rescisão</h2>
          </header>
          <p>
            O site pode suspender ou encerrar o acesso do usuário em casos de violação destes termos. Consequências da rescisão serão aplicadas conforme o caso.
          </p>
        </article>

      </div>
    </section>
  );
}

export default TermosPage;