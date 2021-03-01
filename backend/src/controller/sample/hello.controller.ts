import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetHelloResponse } from './response/get-hello-response'
import { PostHelloRequest } from './request/post-hello-request'
import { GetHelloUseCase } from '../../app/sample/get-hello-usecase'
import { PostHelloUseCase } from '../../app/sample/post-hello-usecase'
import { HelloRepository } from 'src/infra/db/repository/sample/hello-repository'
import { PrismaClient } from '@prisma/client'
import { HelloQS } from 'src/infra/db/query-service/sample/hello-qs'

@Controller({
  path: '/sample',
})
export class SampleController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get()
  @ApiResponse({ status: 200, type: GetHelloResponse })
  async getHello(): Promise<GetHelloResponse> {
    const prisma = new PrismaClient()
    const qs = new HelloQS(prisma)
    const usecase = new GetHelloUseCase(qs)
    const result = await usecase.do()
    const response = new GetHelloResponse({ hellos: result })
    return response
  }

  @Post()
  async postHello(@Body() postHelloDto: PostHelloRequest): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new HelloRepository(prisma)
    const usecase = new PostHelloUseCase(repo)
    await usecase.do({
      hello: postHelloDto.hello,
      required: postHelloDto.required,
      number: postHelloDto.number,
      userIds: postHelloDto.userIds,
    })
  }
}
