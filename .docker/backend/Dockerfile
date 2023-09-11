FROM node:14.5.0-alpine
# ディレクトリ作成
WORKDIR /backend

# ソースのコピー
COPY ../backend ./backend

# パッケージインストール
RUN yarn

EXPOSE 3001

CMD ["yarn", "dev"]