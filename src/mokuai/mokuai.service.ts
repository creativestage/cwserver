import { Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MokuaiSchema, MokuaiSchemaDot } from './mokuai.schema';


@Injectable()
export class MokuaiService {
  constructor(@InjectModel('Mokuai') private readonly mokuaiServe: Model<MokuaiSchemaDot>) {}
  createMokuai(vo: MokuaiSchemaDot) : Promise<MokuaiSchemaDot> {
    const creator = new this.mokuaiServe(vo);
    return creator.save();
  }
  findById(id: Schema.Types.ObjectId): Promise<MokuaiSchemaDot> {
    return this.mokuaiServe.findById(id);
  }
}
