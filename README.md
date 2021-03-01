# Sample Project

## 概要
プロジェクトを立ち上げる際にどうせならと思い、初期構成を作ってみたもの

基本構成は、下記で構成されている。

フロントエンド: Next.js x Typescript  
バックエンド: Nest.js x Typescript  
インフラ: Google App Engine（Standard）  

フロントエンドはVercelなどでも良いが、ちょうどVercelがプロジェクト都合で使えなかったためGAEに統一してある。

Vercelを使いたい場合は、 `./sample/deploy-to-vercel.yml` を参考。


## GAEのCDに必要な情報
1. GAEのservice account（App Engine default service account）をjsonでダウンロード後、jsonをgithubのsecretに環境ごとに設定
```
・PRD_GAE_SA_KEY
・STG_GAE_SA_KEY
```

2. GCPのconsoleより、App Engine Admin APIの有効化
3. 環境ごとに、 `PROJECT_NAME="precise-antenna-303805"` の部分を変更