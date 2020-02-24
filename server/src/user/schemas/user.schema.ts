import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const UserSchema = new Schema({
  username: { type: String, unique: true, required: true, dropDups: true },
  hashedPassword: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
});
