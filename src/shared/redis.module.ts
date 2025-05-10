import { RedisModule } from '@nestjs-modules/ioredis'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    RedisModule.forRoot({
      options: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
      },
      type: 'single'
    }),
  ]
})
export class Redis {}