import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service'
import { Exception } from '@prisma/client'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ApiResponse } from '../../api/ApiResponse'

@Injectable()
export class ExceptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getExceptions(perPage: number, page: number): Promise<ApiResponse<Exception[]>> {
    const total = await this.prisma.exception.count();
    
    const exceptions = await this.prisma.exception.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      orderBy: {
        date: 'desc'
      }
    });

    const lastPage = Math.ceil(total / perPage)
    const pageInfo = {
      total,
      perPage,
      currentPage: page,
      lastPage,
      hasNextPage: page < lastPage,
    }

    return { pageInfo, data: exceptions };
  }

  async delete(id: number): Promise<Exception> {
    return await this.prisma.exception.delete({
      where: { id }
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  public async check() {
    const exceptions = await this.prisma.exception.findMany({})

    const now: Date = new Date();

    for (const exception of exceptions) {
      const datePlusMonth = new Date(
        exception.date.getFullYear(),
        exception.date.getMonth() + 1,
        exception.date.getDate(),
      )

      if (datePlusMonth.getTime() < now.getTime()) {
        await this.prisma.exception.delete({
          where: exception,
        })
      }
    }
  }
}
