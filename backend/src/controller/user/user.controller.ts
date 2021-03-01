import { Body, Controller, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { PostUserRequest } from './request/post-user-request'
import { CreateUserUseCase } from 'src/app/user/create-user-usecase'
import { PrismaClient } from '@prisma/client'
import { UserRepository } from 'src/infra/db/repository/user/user-repository'
import { PostUserResponse } from './response/post-user-response'

@Controller({
  path: '/user',
})
export class UserController {
  @Post()
  @ApiResponse({ status: 200, type: PostUserResponse })
  async postUser(
    @Body() postUserDto: PostUserRequest,
  ): Promise<PostUserResponse> {
    const prisma = new PrismaClient()
    const repo = new UserRepository(prisma)
    const usecase = new CreateUserUseCase(repo)
    const createdUser = await usecase.do({
      email: postUserDto.email,
      fullname: postUserDto.fullname,
      age: postUserDto.age,
    })
    const response = new PostUserResponse(createdUser)
    return response
  }
}
