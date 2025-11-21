# Automação de Criação de Clientes e Ordens de Serviço

Este repositório contém um script em **Node.js** que automatiza a criação de **Clientes** e **Ordens de Serviço (OS)** em uma API REST (Spring Boot) já existente.

A automação é utilizada como apoio em um **trabalho de automação**, simulando o consumo programático de uma API real:

- Faz login como usuário **ADMIN**
- Cria automaticamente clientes
- Cria automaticamente ordens de serviço relacionadas a esses clientes

---

## 1. Objetivo da automação

- Demonstrar como **integrar um script Node.js** com uma API REST.
- Facilitar a **popular o banco de dados** com dados de teste (clientes e OS).
- Servir como exemplo de **automação de cenários reais**, útil para TCC e outras disciplinas.

Fluxo principal:

1. Faz **login** na API (`/api/auth/login`) para obter um **token JWT**.
2. Usa o token para:
   - Criar **clientes** (`/api/clientes`)
   - Criar **ordens de serviço** (`/api/os`)

---

## 2. Tecnologias utilizadas

- **Node.js**
- **Axios** (requisições HTTP)
- **dotenv** (variáveis de ambiente)
- API backend em **Spring Boot** (já existente), com:
  - autenticação JWT
  - entidades Cliente, Usuario, OrdemServico etc.

---

## 3. Pré-requisitos

- Node.js instalado
- API já publicada (ex.: `https://tech-on-api.onrender.com`)
- Usuário **ADMIN** já cadastrado na API
- Opcional: um usuário **TECNICO** já cadastrado (para ser atribuído nas OS)

---

## 4. Estrutura do projeto

Arquivos principais:

- `automation.js` – script principal da automação
- `.env` – configurações da API e credenciais (não deve ser commitado em repositórios públicos)

---

## 5. Configuração do `.env`

Crie um arquivo `.env` na raiz do projeto com:

```env
API_BASE_URL=https://tech-on-api.onrender.com

ADMIN_EMAIL=admin@gmail.com
ADMIN_SENHA=1234

# ID de um usuário técnico existente na API (opcional, mas recomendado)
TECNICO_ID=2
