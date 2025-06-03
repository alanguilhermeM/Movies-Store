# Movies-Store

<p>MoviesStore é uma aplicação full stack para cadastro, listagem e autenticação de usuários e filmes. Foi desenvolvida com foco em boas práticas, segurança e escalabilidade.</p>

## 📁 Estrutura do Projeto

    movies-store/
    ├── backend/            # API Node.js com Express, Docker e MySQL
    │   └── ...
    ├── frontend/           # Aplicação Next.js
    │   └── ...
    └── README.md

## 🚀 Tecnologias Utilizadas

  <ul>
    <li><strong>Frontend:</strong> Next.js, TypeScript, TailwindCSS, Shadcn/UI, Axios</li>
    <li><strong>Backend:</strong> Node.js, Express, TypeScript</li>
    <li><strong>Banco de Dados:</strong> MySQL</li>
    <li><strong>Autenticação:</strong> NextAuth</li>
    <li><strong>APIs:</strong> TMDb</li>
    <li><strong>Outros:</strong> Docker, Dotenv, JWT</li>
  </ul>

## 🔐 Autenticação

  <ul>
    <li>Implementada com NextAuth.js (credenciais)</li>
    <li>JWT e hash de senha no backend</li>
    <li>Proteção de rotas e páginas com sessão</li>
  </ul>

## 📌 Funcionalidades
  <ul>
    <li>✅ Cadastro e login de usuários</li>
    <li>✅ Autenticação via NextAuth</li>
    <li>✅ Cadastro e exclusão de filmes</li>
    <li>✅ Listagem de filmes por usuário</li>
    <li>✅ Edição de perfil</li>
    <li>✅ SideBar para navegação e procura de filmes por nome</li>
    <li>✅ Integração total entre frontend e backend</li>
  </ul>
  
## 📸 Demonstração

[Demonstração](https://github.com/user-attachments/assets/0d3c0048-8224-414a-867a-557d66c57bbd)


## ⚙️ Requisitos

  <ul>
    <li>Node.js (v18+)</li>
    <li>npm ou yarn</li>
    <li>Docker e Docker Compose (recomendado)</li>
    <li>MySQL (caso não use Docker)</li>
  </ul>

## 📦 Instalação
  <ul>
    <li>
        Clonar o repositório
        
          git clone https://github.com/alanguilhermeM/Movies-Store.git
          cd Movies-Store
  <br>
    </li>
    <li>
      Instale as dependências:
      
        # Backend
          cd backend
          npm install
          
          # Frontend
          cd ../frontend
          npm install
  <br>     
    </li>
  </ul>

## 🛠️ Como rodar o projeto

  <ol>
    <li>
      <strong>Configure as variáveis de ambiente:</strong>
        Renomeie .env.example para .env tanto no backend/ quanto no frontend/.
    </li>
    <br>
    <li>
      Rodar com Docker
      
        cd backend
        docker-compose up --build
  <br>
    </li>
    <li>
      Rodar backend
      
        cd backend
        npm run dev
  <br>
    </li>
    <li>
      Rodar frontend
      
        cd ../frontend
        npm run dev
  <br>
    </li>

  Acesse: http://localhost:3000
  </ol>
