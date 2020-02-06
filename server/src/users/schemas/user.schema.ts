import * as mongoose from 'mongoose';
const uuidv4 = require('uuid/v4');
const Schema = mongoose.Schema;
export const UserSchema = new Schema({
  _id: {type: String, default: uuidv4},
  username: String,
  hashedPassword: String,
});
