import { Body, Controller, Post } from '@nestjs/common'
// import { ApiResponse } from '@nestjs/swagger'
import { PostUserRequest } from './request/post-user-request'
import { PrismaClient } from '@prisma/client'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { PostUserUseCase } from 'src/app/post-user-usecase'

@Controller({
  path: '/user',
})
export class UserController {
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
}
