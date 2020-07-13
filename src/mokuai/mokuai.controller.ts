import { Controller, Get, Post, Body, Query, Headers, Req } from '@nestjs/common';
import {MokuaiService} from './mokuai.service'
import { Invited } from '../../Tools/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/mokuai')
@ApiTags('模块接口')
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
    let count = await this.mokuaiService.count(searchQuery);
    return Invited.success({
      rows: result,
      total: count
    });
  }
  @Get('searchByUser')
  async findByUser(@Req() req): Promise<Object> {
    let userId = req.session.user._id;
    let result = await this.mokuaiService.findList({author: userId});
    return Invited.success(result)
  }
  @Post('create')
  async create(@Body() mokuaiVo, @Req() req): Promise<Object> {
    console.log(req.session.user)
    mokuaiVo.author = req.session.user._id;
    let newMokuai = await this.mokuaiService.create(mokuaiVo);
    return Invited.success(newMokuai);
  }
  @Post('update')
  async update(@Body() mokuaiVo, @Req() req): Promise<Object> {
    mokuaiVo.author = req.session.user._id;
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
  @Post('fork')
  async fork(@Req() req, @Body() body): Promise<Object> {
    let mokuai = await this.mokuaiService.findOne({_id: body.id});
    if (!mokuai) {
      return Invited.fail('参数错误');
    }
    // 目标模块数据修改为新模块所需数据
    mokuai = mokuai.toObject();
    mokuai.author = req.session.user._id;
    mokuai.forkId = mokuai._id;
    delete mokuai._id;
    
    let newMokuai = await this.mokuaiService.create(mokuai);
    return Invited.success(newMokuai);
  }
}
