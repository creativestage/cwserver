import { Controller, Post, Body, Req } from '@nestjs/common';
import {Request} from 'express';
import {AuthService} from './auth.service';
import {UserSchemaDot} from './auth.schemas';
import {Invited} from '../../Tools/common';
import {sign} from '../../Tools/userSign';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * 注册接口
   */
  @Post('register')
  async register(@Body() userVo: UserSchemaDot): Promise<Object> {
    const user = await this.authService.findUser(userVo.name);
    if (user) {
      return Invited.fail('已存在该用户');
    }
    const newUser =  await this.authService.createUser(userVo);
    return Invited.success(newUser);
  }
  /**
   * 登录接口
   */
  @Post('login')
  async login(@Body() userVo: UserSchemaDot, @Req() req): Promise<Object> {
    const user = await this.authService.findUser(userVo.name);
    if (!user) {
      return Invited.fail('用户不存在');
    }
    if (user.password !== userVo.password) {
      return Invited.fail('用户名或密码错误');
    }
    req.session.user = user;
    return Invited.success(sign({name: user.name, id: user._id}));
  }
}
