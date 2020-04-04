import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  password: String,
});
export class UserSchemaDot {
  readonly _id: String
  readonly name: String
  readonly password: String
}