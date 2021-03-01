## アーキテクチャ
### 各層の役割
| 層の名前 | 層の役割 | 依存しても良い層 | 依存してはいけない層 |
| - | - | - | - |
| controller | ユースケースの初期化と呼び出し<br><br>リクエストのバリデーション（型の違いや必須項目の不足など、ドメインロジックに影響されない内容のみ） | app<br><br>usecase初期化のために他の層（例えばprismaとかinfra/repositoryとか）にconrollerが依存すること（DIコンテナとしての役割）を例外的に許容する | - |
| infra/db | DBと接続してデータを永続化したり、取り出すこと | app(DTOのみ), domain(entityのみ) | controller |
| app | レポジトリあるいはQS（クエリサービス）の呼び出し | domain | infraには依存してはいけない |
| domain | ドメインロジックを表現すること | なし | domain以外の、どの層にも依存してはいけない |

### QueryServiceとRepositoryについて
| 名前         | 役割               | 戻り値                         | 
| ------------ | ------------------ | ------------------------------ | 
| QueryService | データの取得       | DTO（app層で定義）             | 
| Repository   | データの保存、更新 | エンティティ（domain層で定義） | 


## マイグレーション
#### 実施手順
1. `schema.prisma`にmodel追加
2. `yarn migrate:dev`（本番環境の場合は`yarn migrate:prd`）
3. これでmigrations配下に各マイグレーションの履歴が生成される

#### ロールバックについて
現時点のprismaにはマイグレーションのロールバック機能が存在しない。
そのため、`schema.prisma`を編集して、再度マイグレーションを実施する必要がある

## テスト
#### 単体テスト
1. `yarn test`

#### 統合テスト(DBに対するCRUDを含む)
1. `yarn test:integration`

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
$ npm run test:unit

# test all
$ npm run test
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
