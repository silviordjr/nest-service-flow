<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) API para simulação de um fluxo de atendimento, usando banco de dados MySQL.

## Installation

```bash
$ npm install
```

## Variaveis de Ambiente

```bash
  DB_HOST => Host do banco de dados
  DB_PORT => Porta do banco de dados
  DB_USER => Usuário do banco de dados
  DB_PASSWORD => Senha do usuário do banco de dados
  DB_NAME => Nome do banco
  JWT_SECRET => Segredo para criação do token de autenticação
```

## Migrations

```bash
  npm run migration:up
```

Cria as tabelas no banco MySQL
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

```bash
  POST [BASEURL]/users
  body {
    "name": "Cicrano de Souza",
    "login": "cicrano.souza",
    "password": "1234",
    "role": "PROFESSIONAL"
  }
 ```
  
Cria a conta do usuário, que poderá possuir role PROFESSIONAL, caso seja um profissional, ou CLIENT, caso seja um cliente.

```bash
  PATCH [BASEURL]/users
  body {
    "login": "cicrano.souza",
    "password": "1234",
  }
```
  
Realiza o login do usuário no sistema. Retorna um token de autenticação para o usuário.

```bash
  POST [BASEURL]/services
  headers {
    Authorization: token
  }
  body {
    "name": "aulal de violao",
    "amount": 300,
    "commission": 0.12
  }
```

Cria a solicitação de serviço realizada por um usuário do tipo CLIENT. O token de autenticação obtido no login deve ser repassado no campo Authorization do headers.

```bash
  PATCH [BASEURL]/services
  headers {
    Authorization: token
  }
```
  
Realiza, através de um usuário PROFESSIONAL, o atendimento do pedido do usuário. O token de autenticação obtido no login deve ser repassado no campo Authorization do headers. Caso a role do usuário nao seja PROFESSIONAL, retornará erro.

```bash
  GET [BASEURL]/services
```

Retorna lista de soliciações de serviço.
  
