import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PrismaClient } from '@prisma/client'
import { GetTaskResponse } from './response/get-task-response'
import { TaskQS } from 'src/infra/db/query-service/task-qs'
import { GetTaskUseCase } from 'src/app/usecase/task/get-task-usecase'
import { TaskRepository } from 'src/infra/db/repository/task-repository'
import { TaskFactory } from 'src/domain/factory/task.factory'
import { PostTaskRequest } from './request/post-task-request'
import { PostTaskUseCase } from 'src/app/usecase/task/post-task-usecase'
import { UpdateTaskUseCase } from 'src/app/usecase/task/update-task-usecase'
import { UpdateTaskRequest } from './request/update-task-request'
import { DeleteTaskUseCase } from 'src/app/usecase/task/delete-task-usecase'

@Controller({
  path: '/task',
})
export class TaskController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get()
  @ApiResponse({ status: 200, type: GetTaskResponse })
  async getTasks(): Promise<GetTaskResponse> {
    const prisma = new PrismaClient()
    const qs = new TaskQS(prisma)
    const usecase = new GetTaskUseCase(qs)
    const result = await usecase.do()
    const response = new GetTaskResponse({ tasks: result })
    return response
  }
  @Post()
  async postTask(@Body() postTaskDto: PostTaskRequest): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new TaskRepository(prisma)
    const factory = new TaskFactory(repo)
    const usecase = new PostTaskUseCase(repo, factory)
    await usecase.do({
      title: postTaskDto.title,
      reason: postTaskDto.reason,
      description: postTaskDto.description,
    })
  }
  @Post(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new TaskRepository(prisma)
    const factory = new TaskFactory(repo)
    const usecase = new UpdateTaskUseCase(repo, factory)
    await usecase.do({
      id,
      title: updateTaskDto.title,
      reason: updateTaskDto.reason,
      description: updateTaskDto.description,
    })
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new TaskRepository(prisma)
    const usecase = new DeleteTaskUseCase(repo)
    await usecase.do({
      id,
    })
  }
}
