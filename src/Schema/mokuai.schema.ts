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
  fockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'module'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  lockFlag: Boolean,
});

export class MokuaiSchemaDot {
  readonly _id: String
  readonly key: String
  readonly name: String
  readonly desc: String
  readonly html: String
  readonly css: String
  readonly js: String
  readonly config: String
  readonly poster: String
  readonly version: String
  readonly fockId: mongoose.Schema.Types.ObjectId
  readonly author: mongoose.Schema.Types.ObjectId
  readonly lockFlag: Boolean
}