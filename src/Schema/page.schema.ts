import * as mongoose from 'mongoose';

export const PageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  url: String,
  mokuais: Array
});

class MokuaiDot {
  readonly id: mongoose.Schema.Types.ObjectId
  readonly configuration: Object
}

export class PageSchemaDot {
  readonly _id: String
  readonly name: String
  readonly desc: String
  readonly url: String
  readonly mokuais: Array<MokuaiDot>
}

export class CreatePageDot {
  readonly name: String
  readonly desc: String
  readonly url: String
  readonly mokuais: Array<MokuaiDot>
}