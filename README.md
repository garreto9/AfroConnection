# AfroConnection

**[➡️ Acesse o Site no Ar Aqui!](https://afroconnection.vercel.app)**

---

Bem-vindo ao repositório do **AfroConnection**, uma aplicação web full-stack desenhada para ser um espaço de conexão, fortalecimento e celebração da comunidade negra. O projeto visa fornecer acesso a conteúdos culturais, capacitações, oportunidades de emprego e suporte ao bem-estar mental.

Este repositório é um **monorepo**, o que significa que ele contém dois subprojetos principais numa única base de código:
* **`frontend/`**: Uma Single Page Application (SPA) moderna construída com React.
* **`backend/`**: Uma API RESTful robusta e segura construída com Java e Spring Boot.

## ✨ Arquitetura e Funcionalidades

A aplicação segue uma arquitetura de software moderna, com uma separação clara de responsabilidades entre o cliente (front-end) e o servidor (back-end), alinhada com os princípios do padrão **MVC (Model-View-Controller)**.

* **Front-end (View):** Construído com **React**, é responsável por toda a interface e experiência do utilizador.
* **Back-end (Model & Controller):** Construído com **Java/Spring Boot**, é responsável pela lógica de negócio, segurança, e comunicação com o banco de dados.

### Funcionalidades Implementadas:
* **Sistema de Autenticação Completo:** Registo, login, recuperação de senha e gestão de sessão com Tokens JWT.
* **Sistema de Permissões:** Diferenciação entre utilizadores (`user`) e administradores (`admin`) para proteger rotas e ações.
* **Painel de Administração:** Uma área de gestão completa onde administradores podem criar, ler, atualizar e apagar (CRUD) cursos, oportunidades e utilizadores.
* **Consumo de Conteúdo Dinâmico:** As páginas públicas consomem dados diretamente da API, tornando o conteúdo do site totalmente gerenciável pelo painel de administração.
* **Upload de Ficheiros:** Sistema seguro para upload de imagens para um serviço de nuvem (Cloudinary).
* **Experiência de Utilizador Polida:** Indicadores de carregamento, validação de formulários e notificações de feedback em tempo real.

## 🚀 Tecnologias Utilizadas

### **Front-end**
* **Framework:** [React](https://reactjs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Roteamento:** [React Router](https://reactrouter.com/)
* **Estilização:** CSS puro e [Bootstrap](https://getbootstrap.com/)
* **Gestão de Tokens:** [jwt-decode](https://github.com/auth0/jwt-decode)

### **Back-end**
* **Linguagem:** Java 17
* **Framework:** Spring Boot 3
* **Segurança:** Spring Security
* **Acesso a Dados:** Spring Data JPA (Hibernate)
* **Banco de Dados:** PostgreSQL
* **Autenticação:** JSON Web Tokens (JWT)
* **Build Tool:** Maven
* **Serviços Externos:** Cloudinary (Armazenamento de Imagens), SendGrid (Envio de E-mails).

## 📂 Estrutura de Pastas

O projeto segue uma arquitetura de pacotes por funcionalidade para manter o código organizado e coeso.

```
AfroConnection/
├── backend/
│   ├── src/main/java/com/afroconnection/backend/
│   │   ├── auth/          # Controladores e DTOs para autenticação
│   │   ├── config/        # Configurações globais do Spring
│   │   ├── cursos/        # MVC completo para Cursos
│   │   ├── email/         # Serviço para envio de e-mails
│   │   ├── oportunidades/ # MVC completo para Oportunidades
│   │   ├── security/      # Lógica de segurança (JWT, Filtros)
│   │   ├── upload/        # Lógica para upload de ficheiros
│   │   └── user/          # Entidade e Repositório do Utilizador
│   └── pom.xml            # Dependências do Back-end
│
└── frontend/
    ├── src/
    │   ├── assets/          # Imagens, fontes, etc.
    │   ├── components/      # Componentes reutilizáveis
    │   ├── context/         # Context API (AuthContext)
    │   ├── pages/           # Componentes de página inteira
    │   ├── services/        # Lógica de comunicação com a API
    │   └── styles/          # Ficheiros CSS
    └── package.json       # Dependências do Front-end
```

## ⚙️ Como Executar o Projeto Completo Localmente

Para executar a aplicação full-stack, você precisará de ter os dois servidores (front-end e back-end) a correr em simultâneo.

### **1. Iniciar o Back-end**

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/garreto9/AfroConnection.git
    ```

2.  Abra um terminal e navegue para a pasta `backend`:
    ```bash
    cd AfroConnection/backend
    ```

3.  Certifique-se de que o seu ficheiro `application.properties` está configurado com as suas chaves locais.

4.  Inicie o servidor Java:
    ```bash
    ./mvnw spring-boot:run
    ```
    A API estará disponível em `http://localhost:8080`.

### **2. Iniciar o Front-end**

1.  Abra um **segundo terminal** e navegue para a pasta `frontend`:
    ```bash
    cd AfroConnection/frontend
    ```

2.  Instale as dependências (apenas na primeira vez):
    ```bash
    npm install
    ```

3.  Crie um ficheiro `.env` na raiz da pasta `frontend` e adicione a seguinte linha para apontar para o seu back-end local:
    ```env
    VITE_API_BASE_URL=http://localhost:8080
    ```

4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    O site estará disponível em `http://localhost:5173`.

## 👨‍💻 Desenvolvido Por

Este projeto foi desenvolvido com dedicação pela **Squad 13** do programa Recode Pro AI.

* **Jeffson Garreto** (Líder) - [LinkedIn](https://www.linkedin.com/in/jeffsongarreto/)
* **Maryelly Faustino** (Vice-Líder) - [LinkedIn](https://www.linkedin.com/in/maryelly-faustino-28a8071b8/)
* **Isadora de Leão** - [LinkedIn](https://www.linkedin.com/in/isaleaomoreira/)

## 🌐 Deploy

* O **Front-end** está configurado para deploy contínuo na **Vercel**.
* O **Back-end** está configurado para deploy contínuo no **Render** utilizando um `Dockerfile`.

As variáveis de ambiente de produção estão configuradas diretamente nos painéis de cada plataforma.
