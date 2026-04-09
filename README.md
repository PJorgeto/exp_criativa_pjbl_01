# Sistema de Gestão Pecuária

Este projeto é uma aplicação Full-Stack desenvolvida para o trabalho de PJBL 01. Trata-se de um sistema de gestão de vacas para fazendas, permitindo o cadastro, leitura, atualização e exclusão (CRUD) de vacas do rebanho.

**Desenvolvido por:** Ângelo Piovezan Jorgeto

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e boas práticas:

**Frontend:**
* React (com Vite)
* TypeScript
* Styled-Components (para estilização)
* Axios (para consumo da API RESTful)
* React Router DOM (para navegação entre as telas)

**Backend:**
* Node.js + Express
* TypeScript
* MySQL2 (para comunicação com o banco de dados via Promises)
* CORS (para integração com o frontend)

## Arquitetura do Projeto

O projeto foi estruturado em pastas distintas para separar as responsabilidades:

```text
/pjbl_01
├── /backend          # Servidor da API (Node + Express)
├── /frontend         # Interface do usuário (React)
├── /database         # Script SQL para criação do banco
└── README.md         # Documentação
```
## Funcionalidades e Regras de Negócio

* **C (Create)**: Cadastro de novos animais com 5 campos (Brinco, Nome, Raça, Peso, Data de Nascimento).
* **R (Read)**: Listagem de todo o rebanho e visualização detalhada de um animal específico.
* **U (Update)**: Edição dos dados de um animal.
* **D (Delete)**: Remoção de um animal do sistema.

## Como executar o projeto localmente

### Passo 1: Configurar o Banco de Dados

1. Abra o seu gerenciador do MySQL.
2. Execute o script que está na pasta /database/database.sql para criar o banco de dados fazenda_crud e a tabela vacas.
3. Caso o seu MySQL possua senha, abra o arquivo /backend/src/config/database.ts e insira a sua senha em password.

### Passo 2: Rodar o Backend (API)

1. Abra um terminal e navegue até a pasta do backend: `cd backend`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npx ts-node src/server.ts`

### Passo 3: Rodar o Frontend (Interface)

1. Abra um novo terminal (mantendo o do backend aberto) e navegue até a pasta do frontend: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie a aplicação React: `npm run dev`
4. Acesse no seu navegador o link gerado pelo Vite (geralmente http://localhost:5173/)