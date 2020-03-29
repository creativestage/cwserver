import * as mongoose from 'mongoose';

export const DocSchema = new mongoose.Schema({
  mid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mokuai'
  },
  content: String
});

export class DocSchemaDot {
  _id: String
  readonly mid: mongoose.Schema.Types.ObjectId
  readonly content: String

  toObject: Function
}