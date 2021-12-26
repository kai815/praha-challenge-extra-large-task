import { Body, Controller, Get, Post, Put, Param, Delete } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PostUserRequest } from './request/post-user-request'
import { PrismaClient } from '@prisma/client'
import { GetUsersResponse } from './response/get-users-response'
import { UsersQS } from 'src/infra/db/query-service/users-qs'
import { GetUsersUseCase } from '../../app/get-users-usecase'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { PostUserUseCase } from 'src/app/post-user-usecase'
import { UpdateUserUseCase } from 'src/app/update-user-usecase'
import { UpdateUserRequest } from './request/update-user-request'
import { DeleteUserUseCase } from 'src/app/delete-user-usecase'

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
  @Post()
  async postUser(@Body() postUserDto: PostUserRequest): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new UserRepository(prisma)
    const usecase = new PostUserUseCase(repo)
    await usecase.do({
      name: postUserDto.name,
      email: postUserDto.email,
    })
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new UserRepository(prisma)
    const qs = new UsersQS(prisma)
    const usecase = new UpdateUserUseCase(repo, qs)
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
    const usecase = new DeleteUserUseCase(repo)
    await usecase.do({
      id,
    })
  }
}
