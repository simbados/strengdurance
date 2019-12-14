import * as mongoose from 'mongoose';
export const StrengthWorkoutSchema = new mongoose.Schema({
        date: Date,
        allExercises: [
                {
                // TODO: Change to reference and not include object
                /* exercise: Exercise, */
                repetition: [Number],
                },
        ],
});
