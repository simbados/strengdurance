import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const StrengthWorkoutSchema = new Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  date: Date,
  allExercises: [
    {
      exercise: {type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'},
      repetition: [Number],
      weight: [Number],
      comment: String,
    }
  ],
});
