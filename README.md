# <p align = "center"> Projeto X </p>

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg" width=180/>
</p>

## :clipboard: Descrição

O projeto Sing me a song foi pensado para ser uma plataforma de sugestão de músicas, sendo possível postar uma sugestão apenas com um nome e um link para o vídeo no youtube. Conta com as funcionalidades de dar upvote e downvote, o que serve como parâmetro na hora de sugerir músicas na aba "Top", também conta com a aba "Random", onde a aplicação sugere aleastoriamente uma música postada.

---

## :computer: Tecnologias e Conceitos

-   REST APIs
-   JWTs
-   Node.js
-   TypeScript
-   PostgreSQL
-   React

---

## :rocket: Rotas

```yml
POST /recommendations
    - Rota para cadastrar uma nova recomendação
    - headers: {}
    - body: {
        "name": "Lorem ipsum",
        "youtubeLink": "https://www.youtube.com/watch?v=vik-PASUVuE"
        }
```

```yml
POST /recommendations/:id/upvote
    - Rota para dar upvote na recomendação
    - headers: {}
    - body: {}
```

```yml
POST /recommendations/:id/downvote
    - Rota para dar downvote na recomendação
    - headers: {}
    - body: {}
```

```yml
GET /recommendations
    - Rota para listar as 10 últimas recomendações
    - headers: {}
    - body: {}
```

```yml
GET /recommendations/:id
    - Rota para buscar uma recomendação pelo id
    - headers: {}
    - body: {}
```

```yml
GET /recommendations/random
    - Rota para buscar uma recomendação aleatória
    - headers: {}
    - body: {}
```

```yml
GET /recommendations/top/:amount
    - Rota para buscar as top X (:amount) músicas com maior número de upvotes, ordenadas por pontuação.
    - headers: {}
    - body: {}
```

---

## 🏁 Rodando a aplicação

Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/farias-77/projeto21-singmeasong
```

Depois, dentro de cada pasta (front-end e back-end), rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor

```
npm run dev (na pasta back-end)
npm start (na pasta front-end)
```
