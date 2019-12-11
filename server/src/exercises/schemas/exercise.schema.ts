import * as mongoose from 'mongoose';

export const ExerciseSchema = new mongoose.Schema({
    name: String,
    category: Category,
});
