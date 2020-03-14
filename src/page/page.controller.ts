import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';
import upload from '../../Tools/upload';
const createPage = require('xstage-generate')
import {PageService} from './page.service';
const fs = require('fs')
import { Invited, getPageName } from '../../Tools/common';
@Controller('api/page')
export class PageController {
  constructor(private readonly pageService: PageService){};
  @Post('create')
  async create(@Body() body): Promise<Object> {
    // 通过mokua的id查找到模块信息
    const promises = body.mokuais.map(async (item) => {
      let mokuai = await this.pageService.findMokuaiById(item._id);
      return {
        id: mokuai.key,
        html: mokuai.html,
        css: mokuai.css,
        js: mokuai.js,
        config: JSON.stringify(item.configuration)
      }
    })
    try {
      let mokuais = await Promise.all(promises);
      let htmlString = await createPage(body.title, mokuais);
      let url = await upload(new Buffer(htmlString), getPageName());
      const postData = {
        name: body.title,
        desc: body.desc,
        url,
        mokuais: body.mokuais
      }
      let result = await this.pageService.create(postData);
      return Invited.success(result);
    } catch(e) {
      return Invited.fail('页面生成失败');
    }
  }
  @Get('list')
  async list(): Promise<Object> {
    let result  = await this.pageService.findAll();
    return Invited.success(result);
  }
  @Post('preview')
  async preview(@Body() body): Promise<Object> {
    body.mokuais.forEach(item => {
      item.id = item.key;
      item.config = JSON.stringify(item.configuration);
    });
    try {
      let htmlString = await createPage(body.title, body.mokuais);
      fs.writeFileSync('test11.html', htmlString)
      return Invited.success(htmlString);
    } catch(e) {
      return Invited.fail('页面生成失败');
    }
  }
}
