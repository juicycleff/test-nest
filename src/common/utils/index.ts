import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';

export function getUserId(ctx: any): string {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, ctx.maviAuth.secret) as {
      userId: string;
    };
    return userId;
  }

  throw AuthError;
}

export function getUser(ctx: any): Promise<any> {
  return ctx.db.query.user({ where: { id: getUserId(ctx) } });
}

export class AuthError extends HttpException {
  constructor() {
    super('Not authorized', HttpStatus.FORBIDDEN);
  }
}