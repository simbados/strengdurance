import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const ExerciseSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  category: { type: String, required: true },
});
