import * as mongoose from 'mongoose';

export const MokuaiSchema = new mongoose.Schema({
  key: String,
  name: String,
  desc: String,
  html: String,
  css: String,
  js: String,
  config: String,
  poster: {
    type: String,
    default: 'http://qn.zhangyy.xyz/3c2e1cd452.png',
  },
  version: String,
  forkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mokuai',
    autopopulate: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true
  },
  lockFlag: Boolean,
});

export class MokuaiSchemaDot {
  _id: String
  key: String
  readonly name: String
  readonly desc: String
  readonly html: String
  readonly css: String
  readonly js: String
  readonly config: String
  readonly poster: String
  readonly version: String
  forkId: mongoose.Schema.Types.ObjectId
  readonly author: mongoose.Schema.Types.ObjectId
  readonly lockFlag: Boolean

  toObject: Function
}