# AfroConnection - Front-end

Uma aplicação web dedicada a conectar, fortalecer e celebrar a comunidade negra. A aplicação foi construída com **React** e **Vite**, e está desenhada para ser uma Single Page Application (SPA) moderna, rápida e responsiva.

O front-end está conectado a um back-end em Java (Spring Boot) que gere os dados, a autenticação e a lógica de negócio.

## ✨ Funcionalidades Implementadas

A aplicação de front-end está "feature-complete" e inclui as seguintes funcionalidades:

#### **Navegação e Páginas Públicas**
* **Roteamento Completo:** Navegação fluida entre todas as páginas sem recarregar, utilizando `react-router-dom`.
* **Páginas de Conteúdo:**
    * Home
    * Cultura
    * Sobre Nós
    * Bem-estar Mental
* **Página 404:** Uma página amigável para rotas não encontradas.

#### **Autenticação e Gestão de Conta**
* **Fluxo de Autenticação Completo:**
    * **Registo de Utilizador:** Formulário com validação de dados (formato de e-mail, força da senha) que se conecta à API de registo.
    * **Login de Utilizador:** Formulário que se conecta à API de login, gere tokens JWT e lida com erros de autenticação.
    * **Recuperação de Senha:** Fluxo completo com páginas para "Esqueci a Senha" e "Redefinir Senha".
* **Gestão de Estado Global:** Utilização do Context API (`AuthContext`) para gerir o estado de autenticação em toda a aplicação.
* **Sessão de Utilizador:** A sessão é mantida através do `sessionStorage`, garantindo que o utilizador permaneça logado ao recarregar a página, mas seja deslogado ao fechar o navegador.
* **Página de Configurações da Conta:** Uma área protegida onde o utilizador pode (simuladamente, futura implementação) atualizar os seus dados e apagar a sua conta, com modais de confirmação.

#### **Painel de Administração**
* **Rotas Protegidas:** Acesso ao painel de administração e às páginas de utilizador logado é protegido por um componente `ProtectedRoute` que verifica o estado de autenticação e o cargo (`role`) do utilizador.
* **Dashboard de Admin:** Uma área de gestão com layout próprio e navegação lateral.
* **Gestão de Conteúdo (CRUD Completo):**
    * **Gerir Oportunidades:** Interface para criar, visualizar, editar e apagar vagas de emprego, totalmente conectada ao back-end.
    * **Gerir Cursos:** Interface para criar, visualizar, editar e apagar cursos e capacitações.
    * **Gerir Utilizadores:** Interface para visualizar todos os utilizadores, alterar os seus cargos (user/admin) e resetar as suas senhas.

## 🚀 Tecnologias Utilizadas

* **Framework:** [React](https://reactjs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Roteamento:** [React Router](https://reactrouter.com/)
* **Estilização:** CSS puro com o apoio do [Bootstrap](https://getbootstrap.com/) para o sistema de grid e componentes base.
* **Ícones:** [Bootstrap Icons](https://icons.getbootstrap.com/)
* **Gestão de Tokens:** [jwt-decode](https://github.com/auth0/jwt-decode)

## ⚙️ Como Executar o Projeto Localmente

Para configurar e executar o projeto no seu ambiente de desenvolvimento, siga estes passos:

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/garreto9/AfroConnection.git
    ```

2.  **Navegue para a Pasta do Front-end:**
    ```bash
    cd AfroConnection/frontend
    ```

3.  **Instale as Dependências:**
    ```bash
    npm install
    ```

4.  **Configure as Variáveis de Ambiente:**
    * Crie um ficheiro chamado `.env` na raiz da pasta `frontend`.
    * Este ficheiro é usado para definir a URL do seu back-end local. Adicione a seguinte linha:
        ```env
        VITE_API_BASE_URL=http://localhost:8080
        ```

5.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

## 📂 Estrutura de Pastas

O projeto segue uma estrutura organizada para facilitar a manutenção e o desenvolvimento.

```
frontend/
├── public/              # Ficheiros estáticos
└── src/
    ├── assets/          # Imagens, fontes, etc.
    ├── components/      # Componentes reutilizáveis (Navbar, Footer, PageHero, etc.)
    ├── context/         # Context API para gestão de estado global (AuthContext)
    ├── pages/           # Componentes que representam uma página inteira
    ├── services/        # Lógica de comunicação com a API (api.js)
    ├── styles/          # Ficheiros CSS globais e por componente
    ├── App.jsx          # Componente principal que gere as rotas
    └── main.jsx         # Ponto de entrada da aplicação React
```

## 🌐 Deploy

O front-end está configurado para deploy contínuo na **Vercel**. Qualquer `push` para a branch `main` irá acionar um novo deploy automaticamente. As variáveis de ambiente de produção (como a `VITE_API_BASE_URL` do back-end no Render) estão configuradas diretamente no painel da Vercel.

