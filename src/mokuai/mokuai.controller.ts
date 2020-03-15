import { Controller, Get, Post, Body, Query, Headers, Req } from '@nestjs/common';
import {MokuaiService} from './mokuai.service'
import { Invited } from '../../Tools/common';

@Controller('api/mokuai')
export class MokuaiController {
  constructor(private readonly mokuaiService: MokuaiService){}
  @Get('find')
  async find(@Query() query): Promise<Object> {
    let mokuai = await this.mokuaiService.findOne({_id: query.id});
    if (!mokuai) {
      return Invited.fail('参数错误');
    }
    return Invited.success(mokuai);
  }
  @Get('search')
  async search(@Query() searchQuery): Promise<Object> {
    const limit = +searchQuery.pageSize || 20;
    const skip = (((+searchQuery.page) || 1) - 1) * limit;
    delete searchQuery.page;
    delete searchQuery.pageSize;
    let result = await this.mokuaiService.findList(searchQuery, limit, skip);
    return Invited.success(result);
  }
  // @Get('findByUser')
  // async findByUser(@Headers() headers): Promise<Object> {
  //   console.log(headers);
  // }
  @Post('create')
  async create(@Body() mokuaiVo): Promise<Object> {
    let newMokuai = await this.mokuaiService.create(mokuaiVo);
    return Invited.success(newMokuai);
  }
  @Post('update')
  async update(@Body() mokuaiVo): Promise<Object> {
    let mokuai = await this.mokuaiService.findOne({_id: mokuaiVo._id});
    if (!mokuai) {
      return Invited.fail('参数错误');
    }
    let result = await this.mokuaiService.updateOne(mokuaiVo);
    return Invited.success(result);
  }
  @Post('lock')
  async lock(@Body() body): Promise<Object> {
    let mokuai = await this.mokuaiService.findOne({_id: body.id});
    if (!mokuai) {
      return Invited.fail('参数错误');
    }
    let result = await this.mokuaiService.lockOne(body.id);
    return Invited.success(result);
  }
  @Post('unlock')
  async unlock(@Body() body): Promise<Object> {
    let mokuai = await this.mokuaiService.findOne({_id: body.id});
    if (!mokuai) {
      return Invited.fail('参数错误');
    }
    let result = await this.mokuaiService.unlockOne(body.id);
    return Invited.success(result);
  }
}
