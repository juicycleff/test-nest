import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { IAuthService, IJwtOptions } from './interfaces/auth.interface';
import { MessageCodeError } from '../common/index';

@Injectable()
export class AuthService implements IAuthService {
  private _options: IJwtOptions = {
    algorithm: 'HS256',
    expiresIn: '30 days',
    jwtid: process.env.JWT_ID || '',
  };

  get options(): IJwtOptions {
    return this._options;
  }

  set options(value: IJwtOptions) {
    this._options.algorithm = value.algorithm;
  }

  async login(credentials: { email: string; password: string; }): Promise<string> {
    /*const user = await User.findOne<User>({
      where: {
        email: credentials.email,
        password: crypto.createHmac('sha256', credentials.password).digest('hex'),
      },
    });
    if (!user) throw new MessageCodeError('user:notFound');
    */
    const payload = {
      id: 'user.id',
      email: 'user.email',
    };

    return await jwt.sign(payload, process.env.JWT_KEY || '', this._options);
  }

  async createToken() {
    const user: JwtPayload = { email: 'test@email.com' };
    const expiresIn = 3600;
    const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    return {};
  }
}
