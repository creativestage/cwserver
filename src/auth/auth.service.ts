import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {UserSchema, UserSchemaDot} from '../Schema';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserSchemaDot>) {}
  findUser(name: String): Promise<UserSchemaDot> {
    return this.userModel.findOne({name}).exec();
  }
  createUser(vo: UserSchemaDot): Promise<UserSchemaDot> {
    const creator = new this.userModel(vo);
    return creator.save();
  }
}
