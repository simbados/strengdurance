import * as mongoose from 'mongoose';
import Category from '../categories';

export const ExerciseSchema = new mongoose.Schema({
        name: String,
        category: {
                type: String,
                enum: Category,
        },
});
module.exports = mongoose.model('Exercise', ExerciseSchema); 
