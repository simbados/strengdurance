import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const ExerciseSchema = new Schema({
        name: String,
        category: String,
});
