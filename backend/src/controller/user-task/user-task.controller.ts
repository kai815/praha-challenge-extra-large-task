import { Body, Controller, Post, Param } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PrismaClient } from '@prisma/client'
import { UserTaskRepository } from 'src/infra/db/repository/user-task-repository'
import { UserTaskFactory } from 'src/domain/factory/user-task.factory'
import { UpdateUserTaskUseCase } from 'src/app/usecase/user-task/update-user-task-usecase'
import { UpdateUserTaskRequest } from './request/update-user-task-request'

@Controller({
  path: '/user-task',
})
export class UserTaskController {
  @Post(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserTaskDto: UpdateUserTaskRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new UserTaskRepository(prisma)
    const factory = new UserTaskFactory(repo)
    const usecase = new UpdateUserTaskUseCase(repo, factory)
    await usecase.do({
      id,
      status: updateUserTaskDto.status,
    })
  }
}
