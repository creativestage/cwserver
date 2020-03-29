import { Controller, Get, Post, Body, Query, Headers, Req } from '@nestjs/common';
import {DocumentService} from './document.service'
import { Invited } from '../../Tools/common';

@Controller('api/doc')
export class DocumentController {
  constructor(private readonly docService: DocumentService){}
  @Post('create')
  async create(@Body() body): Promise<Object> {
    let newDoc = await this.docService.create(body);
    return Invited.success(newDoc);
  }
  @Post('update')
  async update(@Body() body): Promise<Object> {
    let newDoc = await this.docService.update(body);
    return Invited.success(newDoc);
  }
  @Get('findById')
  async findById(@Query() query): Promise<Object> {
    let doc = await this.docService.findOne({_id: query.id});
    if (!doc) {
      return Invited.fail('参数错误');
    }
    return Invited.success(doc);
  }
  @Get('findByMid')
  async findByMid(@Query() query): Promise<Object> {
    let doc = await this.docService.findOne({mid: query.mid});
    if (!doc) {
      return Invited.fail('参数错误');
    }
    return Invited.success(doc);
  }
}
