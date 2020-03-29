import { Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DocSchemaDot } from '../Schema';

@Injectable()
export class DocumentService {
  constructor(@InjectModel('Doc') private readonly docService: Model<DocSchemaDot>) {}
  create(docVo: DocSchemaDot): Promise<DocSchemaDot> {
    const creator = new this.docService(docVo);
    return creator.save();
  }
  update(docVo: DocSchemaDot): Promise<DocSchemaDot> {
    return this.docService.findByIdAndUpdate(docVo._id, docVo, {new: true, upsert: true});
  }
  findOne(query: Object): Promise<DocSchemaDot> {
    return this.docService.findOne(query);
  }
}
