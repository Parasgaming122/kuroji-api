import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RootPathBlockerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/') {
      return res.status(200).send({ message: 'API is live. Use /api/* endpoints.' })
    }
    next()
  }
}
