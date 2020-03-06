import * as mongoose from 'mongoose';

export const MokuaiSchema = new mongoose.Schema({
  name: String,
  desc: String,
  code: {
    html: String,
    css: String,
    js: String,
    config: String
  },
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
});

class CodeDot {
  readonly html: String
  readonly css: String
  readonly js: String
  readonly config: String
}
export class MokuaiSchemaDot {
  readonly _id: String
  readonly name: String
  readonly desc: String
  readonly code: CodeDot
  readonly poster: String
  readonly version: String
  readonly fockId: mongoose.Schema.Types.ObjectId
  readonly author: mongoose.Schema.Types.ObjectId
}