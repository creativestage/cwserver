import { Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MokuaiSchema, MokuaiSchemaDot } from '../Schema';


@Injectable()
export class MokuaiService {
  constructor(@InjectModel('Mokuai') private readonly mokuaiServe: Model<MokuaiSchemaDot>) {}
  create(vo: MokuaiSchemaDot) : Promise<MokuaiSchemaDot> {
    const creator = new this.mokuaiServe(vo);
    return creator.save();
  }
  /**
   * 分页查询方法
   * @param queryVo 字段查新对象
   * @param limit 长度
   * @param skip 跳过长度
   */
  findList(queryVo: Object, limit: Number, skip: Number): Promise<Array<MokuaiSchemaDot>> {
    return this.mokuaiServe
      .find(queryVo)
      .limit(limit)
      .skip(skip)
      .exec();
  }
  findOne(queryVo: Object): Promise<MokuaiSchemaDot> {
    return this.mokuaiServe.findOne(queryVo);
  }
  updateOne(vo: MokuaiSchemaDot): Promise<MokuaiSchemaDot> {
    return this.mokuaiServe.findByIdAndUpdate(vo._id, vo, {new: true, upsert: true});
  }
  lockOne(id: String): Promise<MokuaiSchemaDot> {
    return this.mokuaiServe.findByIdAndUpdate(id, {lockFlag: true}, {new: true, upsert: true});
  }
  unlockOne(id: String): Promise<MokuaiSchemaDot> {
    return this.mokuaiServe.findByIdAndUpdate(id, {lockFlag: false}, {new: true, upsert: true});
  }
}
