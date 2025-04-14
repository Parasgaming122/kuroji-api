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
    let message = 'Something went wrong, fam 😤'
    let stack: string | undefined
    let file: string | undefined
    let line: number | undefined

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const res = exception.getResponse()
      message = typeof res === 'string' ? res : (res as any).message
    }

    if (exception instanceof Error) {
      stack = exception.stack
      const stackLines = stack?.split('\n')[1]?.trim()?.match(/\((.*):(\d+):(\d+)\)/)
      if (stackLines) {
        const absolutePath = stackLines[1]
        file = absolutePath.split('veanime__nestend')[1] || absolutePath
        line = parseInt(stackLines[2])
      }
    }

    // Save error log to DB, but don’t block if it fails
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
          stack
        }
      })
    } catch (e) {
      console.error('🔥 Failed to save exception log:', e)
    }

    // Now delegate back to default handler
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