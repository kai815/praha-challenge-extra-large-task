import { Module } from '@nestjs/common'
import { SampleController } from './controller/sample/some-data.controller'
import { UserController } from './controller/user/user.controller'
import { TaskController } from './controller/task/task.controller'
import { UserTaskController } from './controller/user-task/user-task.controller'

// memo: DIコンテナとしては使わないため、controllerの追加だけしてください
@Module({
  imports: [],
  controllers: [
    SampleController,
    UserController,
    TaskController,
    UserTaskController,
  ],
  providers: [],
})
export class AppModule {}
