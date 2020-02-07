import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const ExerciseSchema = new Schema({
  name: {type: String, required: true, unique: true, dropDups: true},
  category: {type: String, required: true},
});
