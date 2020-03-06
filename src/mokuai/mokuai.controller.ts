import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {MokuaiService} from './mokuai.service'
import { Invited } from '../../Tools/common';
@Controller('api/mokuai')
export class MokuaiController {
  constructor(private readonly mokuaiService: MokuaiService){}
  @Get('find')
  async find(@Query() query): Promise<Object> {
    let mokuai = await this.mokuaiService.findById(query.id);
    if (!mokuai) {
      return Invited.fail('参数错误');
    }
    return Invited.success(mokuai);
  }
  @Post('create')
  async create(@Body() mokuaiVo): Promise<Object> {
    let newMokuai = await this.mokuaiService.createMokuai(mokuaiVo);
    return Invited.success(newMokuai);
  }
}
