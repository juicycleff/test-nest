import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(context: string): MiddlewareFunction {
    return (req, res, next) => {
      // tslint:disable-next-line:no-console
      console.log(`[${context}] Request...`);
      next();
    };
  }
}
