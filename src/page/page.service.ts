import { Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {MokuaiSchemaDot, PageSchemaDot, CreatePageDot} from '../Schema' 

@Injectable()
export class PageService {
  constructor(
    @InjectModel('Page') private readonly pageService: Model<PageSchemaDot>,
    @InjectModel('Mokuai') private readonly mokuaiService: Model<MokuaiSchemaDot>,
  ){};
  findMokuaiById(id: String): Promise<MokuaiSchemaDot> {
    return this.mokuaiService.findById(id);
  }
  create(pageVo: CreatePageDot): Promise<PageSchemaDot> {
    let pageModle = new this.pageService(pageVo);
    return pageModle.save();
  }
  findAll(): Promise<Array<PageSchemaDot>> {
    return this.pageService.find({});
  }
}
