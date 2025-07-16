# AfroConnection - Back-end

Este é o repositório do back-end para a plataforma AfroConnection. A aplicação foi construída com **Java** e **Spring Boot**, utilizando uma arquitetura MVC para fornecer uma API RESTful segura e escalável.

O back-end é responsável pela lógica de negócio, gestão de dados e pela segurança da aplicação, comunicando-se com um banco de dados PostgreSQL (hospedado no Supabase) e um front-end em React.

## ✨ Funcionalidades Implementadas

* **Autenticação e Segurança com JWT:**
    * Endpoints públicos para registo (`/register`) e login (`/login`).
    * Geração de JSON Web Tokens (JWT) após um login bem-sucedido.
    * Sistema de segurança que valida o token JWT em cada pedido para rotas protegidas.
    * Criptografia de senhas utilizando BCrypt.

* **Autorização Baseada em Cargos (Roles):**
    * Diferenciação entre utilizadores (`user`) e administradores (`admin`).
    * Endpoints de gestão protegidos com `@PreAuthorize("hasAuthority('admin')")`, garantindo que apenas administradores possam modificar conteúdos críticos.

* **CRUD Completo para Conteúdo:**
    * **Cursos/Capacitações:** Endpoints para criar, ler, atualizar e apagar cursos.
    * **Oportunidades:** Endpoints para criar, ler, atualizar e apagar vagas de emprego.
    * **Utilizadores:** Endpoints para um administrador listar, apagar e alterar o cargo de utilizadores.

* **Funcionalidades de Conta:**
    * Fluxo completo de "Esqueci a Senha", com geração de token de recuperação e um endpoint para redefinir a senha.

* **Upload de Ficheiros:**
    * Endpoint seguro para upload de imagens, integrado com o serviço **Cloudinary** para armazenamento de mídias.

## 🚀 Tecnologias Utilizadas

* **Linguagem:** Java 17
* **Framework:** Spring Boot 3
* **Segurança:** Spring Security
* **Acesso a Dados:** Spring Data JPA (Hibernate)
* **Banco de Dados:** PostgreSQL
* **Autenticação:** JSON Web Tokens (JWT)
* **Build Tool:** Maven

## 📂 Estrutura de Pastas

O projeto segue uma arquitetura de pacotes por funcionalidade para manter o código organizado e coeso.

```
backend/
└── src/
    └── main/
        └── java/
            └── com/
                └── afroconnection/
                    └── backend/
                        ├── auth/          # Controladores e DTOs para autenticação (login, registo)
                        ├── config/        # Configurações globais do Spring (ex: SecurityConfig)
                        ├── cursos/        # MVC completo para Cursos (Controller, Service, Repository, Model)
                        ├── email/         # Serviço para envio de e-mails (SendGrid)
                        ├── oportunidades/ # MVC completo para Oportunidades
                        ├── security/      # Lógica de segurança (JWT, UserDetailsService, Filtros)
                        ├── upload/        # Lógica para upload de ficheiros (Cloudinary)
                        └── user/          # Entidade e Repositório do Utilizador
```

## ⚙️ Como Executar o Projeto Localmente

1.  **Pré-requisitos:**
    * JDK 17 ou superior.
    * Maven.

2.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/garreto9/AfroConnection.git
    ```
 
3.  **Navegue para a Pasta do Back-end:**
    ```bash
    cd AfroConnection/backend
    ```

4.  **Configure as Variáveis de Ambiente:**
    * Na pasta `src/main/resources`, abra o ficheiro `application.properties`.
    * Certifique-se de que as variáveis de conexão com o banco de dados (Supabase) e as chaves de API (Cloudinary, JWT) estão preenchidas corretamente para o seu ambiente local.

5.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    ./mvnw spring-boot:run
    ```
    A API estará disponível em `http://localhost:8080`.

## 🌐 Deploy

O back-end está configurado para deploy contínuo no **Render** utilizando um `Dockerfile`, garantindo um ambiente de produção consistente e isolado. As variáveis de ambiente de produção estão configuradas diretamente no painel do Render.
