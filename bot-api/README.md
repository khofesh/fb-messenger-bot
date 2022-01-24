## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

GPL v2

## test

```shell
curl -X GET "localhost:3000/webhook?hub.verify_token=4opq8hRs5UjR8Geeh7ZM&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
```

```shell
curl -H "Content-Type: application/json" -X POST "localhost:3000/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'
```

## deploy to heroku

```shell
[fahmad@ryzen bot-api]$  heroku apps:create
 ›   Warning: heroku update available from 7.59.1 to 7.59.2.
Creating app... done, ⬢ immense-plains-76716
https://immense-plains-76716.herokuapp.com/ | https://git.heroku.com/immense-plains-76716.git
```
