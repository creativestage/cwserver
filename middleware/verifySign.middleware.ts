import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import {verifySign} from '../Tools/userSign';

@Injectable()
export class VerifySignMiddleware implements NestMiddleware {
  async use(req, res: Response, next: Function) {
    // let token = req.headers._cwsign_;
    // let isPass = await verifySign(token);
    // if (!isPass) {
    //   return res.json({error_code: 10001, error_msg: '无效的签名'})
    // }
    // if (!req.session.user) {
    //   return res.json({error_code: 10002, error_msg: '无效的会话'})
    // }
    next();
  }
}
