API de Gerenciamento de Treinos
API REST desenvolvida em Node.js para gerenciamento de treinos e exercícios de uma academia digital.

Tecnologias:
    Node.js
    Express
    PostgreSQL
    Prisma ORM

Funcionalidades:
    Cadastro de treinos
    Listagem de treinos com exercícios vinculados
    Atualização de treinos
    Exclusão de treinos
    Cadastro de exercícios
    Listagem de exercícios
    Vinculação de exercícios a treinos
    Consulta dos exercícios de um treino
    Desvinculação de exercícios de um treino

Instalação:

Clone o repositório:
git clone URL_DO_REPOSITORIO

Entre na pasta do projeto:
cd nome-do-projeto

Instale as dependências:
npm install

Configuração:

Crie um arquivo .env na raiz do projeto:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

Gere o link da DATABASE_URL e substitua:
npx create-db

Depois, execute:
npx prisma generate
npx prisma migrate dev

(Executando o projeto)

Para iniciar o servidor:
npm run dev OU npm start

A API estará disponível em:
http://localhost:3001

Endpoints:

Treinos:
Método	Rota	Descrição
POST	/treinos	Cadastrar um treino - no postman: (localhost:3001/treinos) - configurar: (body, raw, JSON) - ( {"nome": " ", "objetivo": " "} )
GET	/treinos	Listar todos os treinos - no postman: (localhost:3001/treinos)
PUT	/treinos	Atualizar um treino - no postman: (localhost:3001/treinos/id) - configurar: (body, raw, JSON) - ( {"nome": " ", "objetivo": " "} )
DELETE	/treinos/:id	Deletar um treino - no postman: (localhost:3001/treinos/id)

Exercícios:
Método	Rota	Descrição
POST	/exercicios	Cadastrar um exercício - no postman: (localhost:3001/exercicios) - configurar: (body, raw, JSON) - ( {"nome": " ", "grupoMuscular": [" "] } )
GET	/exercicios	Listar todos os exercícios - no postman: (localhost:3001/exercicios)

Treino e Exercícios:
Método	Rota	Descrição
POST	/treinos/vincular	Vincular exercício a um treino - no postman: (localhost:3001/treinos/vincular) - configurar: (body, raw, JSON) - ( { treinoId: INT, exercicioId: INT } )
GET	/treinos/:id/exercicios	Listar exercícios de um treino - no postman: (localhost:3001/treinos/id/exercicios/id)
DELETE	/treinos/:id/exercicios/:exercicioId	Desvincular exercício de um treino - no postman: (localhost:3001/treinos/id/exercicios/id)


Banco de Dados - O projeto utiliza PostgreSQL e Prisma ORM.

O relacionamento entre Treino e Exercicio é do tipo N:N, utilizando a tabela intermediária TreinoExercicio.

