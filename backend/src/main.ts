import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  if (process.env.STAGE !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('backend sample')
      .setDescription('The API description')
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('openapi', app, document)
  }
  //TODO 中身どうなっているか後でチェックする
  app.enableCors()

  await app.listen(Number(process.env.PORT) || 3001)
}
bootstrap()
