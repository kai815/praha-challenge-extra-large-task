// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PostHelloRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly hello!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly required!: boolean

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly number!: number

  // memo: ApiPropertyはswaggerのドキュメント生成用、それ以外はアプリケーション自体のバリデーションに必要。配列やオブジェクトなどの非プリミティブな型の時だけ必要なので、プリミティブ型の時はこのように書く必要はありません！
  @ApiProperty({
    required: true,
    type: [String],
  })
  @IsNotEmpty()
  // memo: 配列の型をvalidateする時の書き方 https://github.com/typestack/class-validator/issues/323
  @IsString({ each: true })
  readonly userIds!: string[]
}
