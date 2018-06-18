import { Controller, Get, UseGuards, Post, HttpStatus, Request, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { MessageCodeError } from '../common/index';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('token')
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    // this route is restricted
  }

  @Post('login')
  public async login(@Request() req, @Response() res) {
    const body = req.body;
    if (!body) throw new MessageCodeError('auth:login:missingInformation');
    if (!body.email) throw new MessageCodeError('auth:login:missingEmail');
    if (!body.password) throw new MessageCodeError('auth:login:missingPassword');

    const token = await this.authService.login(body);
    res.status(HttpStatus.ACCEPTED).json('Bearer ' + token);
  }
}
