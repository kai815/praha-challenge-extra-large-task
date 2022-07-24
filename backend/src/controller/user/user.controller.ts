import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PostUserRequest } from './request/post-user-request'
import { PrismaClient } from '@prisma/client'
import { GetUsersResponse } from './response/get-users-response'
import { UsersQS } from 'src/infra/db/query-service/users-qs'
import { GetUsersUseCase } from '../../app/get-users-usecase'
import { SearchUserUseCase } from '../../app/search-user-usecase'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { UserFactory } from 'src/domain/factory/user.factory'
import { PostUserUseCase } from 'src/app/post-user-usecase'
import { UpdateUserUseCase } from 'src/app/update-user-usecase'
import { UpdateUserRequest } from './request/update-user-request'
import { SearchUserQuery } from './request/search-user-query'
import { DeleteUserUseCase } from 'src/app/delete-user-usecase'
import { UserTaskRepository } from 'src/infra/db/repository/user-task-repository'
import { UserTaskFactory } from 'src/domain/factory/user-task.factory'
import { TaskQS } from 'src/infra/db/query-service/task-qs'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { TeamService } from 'src/domain/service/team.service'

@Controller({
  path: '/user',
})
export class UserController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get()
  @ApiResponse({ status: 200, type: GetUsersResponse })
  async getUsers(): Promise<GetUsersResponse> {
    const prisma = new PrismaClient()
    const qs = new UsersQS(prisma)
    const usecase = new GetUsersUseCase(qs)
    const result = await usecase.do()
    const response = new GetUsersResponse({ users: result })
    return response
  }
  @Get('/search')
  @ApiResponse({ status: 200, type: GetUsersResponse })
  async searchUser(
    @Query() searchUserQuery: SearchUserQuery,
  ): Promise<GetUsersResponse> {
    const prisma = new PrismaClient()
    const qs = new UsersQS(prisma)
    const usecase = new SearchUserUseCase(qs)
    const result = await usecase.do(searchUserQuery)
    const response = new GetUsersResponse({ users: result })
    return response
  }
  @Post()
  async postUser(@Body() postUserDto: PostUserRequest): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new UserRepository(prisma)
    const factory = new UserFactory(repo)
    const taskQS = new TaskQS(prisma)
    const userTaskRepo = new UserTaskRepository(prisma)
    const userTaskFac = new UserTaskFactory(userTaskRepo)
    const teamRepo = new TeamRepository(prisma)
    const teamService = new TeamService(teamRepo)
    const usecase = new PostUserUseCase(
      repo,
      factory,
      taskQS,
      userTaskRepo,
      userTaskFac,
      teamRepo,
      teamService,
    )
    await usecase.do({
      name: postUserDto.name,
      email: postUserDto.email,
    })
  }
  @Post(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new UserRepository(prisma)
    const factory = new UserFactory(repo)
    const usecase = new UpdateUserUseCase(repo, factory)
    await usecase.do({
      id,
      name: updateUserDto.name,
      email: updateUserDto.email,
      status: updateUserDto.status,
    })
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new UserRepository(prisma)
    const userTaskRepo = new UserTaskRepository(prisma)
    const usecase = new DeleteUserUseCase(repo, userTaskRepo)
    await usecase.do({
      id,
    })
  }
}
