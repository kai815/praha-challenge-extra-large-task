import { Module } from '@nestjs/common'
import { SampleController } from './controller/sample/some-data.controller'
import { UserController } from './controller/user/user.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [SampleController, UserController],
  providers: [],
})
export class AppModule {}
