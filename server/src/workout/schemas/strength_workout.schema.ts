import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const StrengthWorkoutSchema = new Schema({
        date: Date,
        allExercises: [
                {
                        exercise: mongoose.Schema.Types.ObjectId,
                        repetition: [Number],
                }
        ],
});
