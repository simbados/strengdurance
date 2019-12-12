import * as mongoose from 'mongoose';
import {Category} from 'src/exercises/categories';

export const ExerciseSchema = new mongoose.Schema({
    name: String,
    category: Category,
});
