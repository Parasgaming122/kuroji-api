import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { Response } from 'express'

@Catch()
export class ExceptionsHandler implements ExceptionFilter {
  constructor(private readonly prisma: PrismaService) { }

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Something went wrong'
    let stack: string | undefined
    let file: string | undefined
    let line: number | undefined
    let headers: string | undefined

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res = exception.getResponse()
      message = typeof res === 'string' ? res : (res as any).message
      headers = typeof res === 'string' ? res : (res as any).headers
    }

    if (exception instanceof Error) {
      stack = exception.stack;
      message = exception.message
      console.log(stack);
      const stackLines = stack?.split('\n')[1]?.trim()?.match(/\((.*):(\d+):(\d+)\)/)
      if (stackLines) {
        const absolutePath = stackLines[1]
        file = absolutePath.split('veanime__nestend')[1] || absolutePath
        line = parseInt(stackLines[2])
      }
    }

    try {
      await this.prisma.exception.create({
        data: {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          message: message,
          file: file ?? null,
          line: line?.toString() ?? null,
          stack,
          headers,
        }
      })
    } catch (e) {
      console.error('🔥 Failed to save exception log:', e)
    }

    if (exception instanceof HttpException) {
      response.status(status).json(exception.getResponse())
    } else {
      response.status(status).json({
        statusCode: status,
        message: message,
      })
    }
  }
}