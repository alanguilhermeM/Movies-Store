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
    <li>
      Crie e configure as <strong>Variaveis de Ambiente</strong>:
      
        movies-store/
        ├── backend/
           └── envs/
               └── api.env
               └── database.env
        ├── frontend/
           └── prisma/
           └── src/
           └── .env
<br>

    # api.env
    
        DATABASE_URL="mysql://root:password@database:3306/moviesdb"
        DATABASE_HOST=database 
        DATABASE_PORT=3306
        DATABASE_USER=root
        DATABASE_PASSWORD=password
        DATABASE_NAME=moviesdb
            
        PORT=3001
            
        JWT_SECRET=e0102e32dd3a3e2120afae0c38297d71fc63eada316229b0c9dd2509f32bec698ea78338c3b79369b878e47f397ec5d82541cdf7eb264572e0a4b1368c50e1f5
<br>
 
    # database.env
    
        MYSQL_ROOT_PASSWORD=password 
        MYSQL_DATABASE=moviesdb   
<br>
 
    # .env
    
        NEXTAUTH_URL="http://localhost:3001"
        NEXTAUTH_SECRET="fj02#@!LKAF9832jfkdsl9034JKLNF@kdjds#KLJ"
  <br>     
    </li>
  </ul>

## 🛠️ Como rodar o projeto

  <ol>
    <li>
      <strong><h2>LEMBRETE:</h1>Configure as variáveis de ambiente:</strong>
        Crie e configure as variaveis de ambiente no backend e no frontend
    </li>
    <br>
    <li>
      Rodar com Docker
      
        cd backend
        docker-compose up --build
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
