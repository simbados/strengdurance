import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const BlacklistSchema = new Schema({
  createdAt: {type: Date, expires: process.env.JWT_EXPIRY + 60, default: Date.now},
  jwt: {type: String, required: true, unique: true},
});
