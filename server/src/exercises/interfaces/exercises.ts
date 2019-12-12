import { Document } from 'mongoose';
import {Category} from 'src/exercises/categories';

export interface Exercise extends Document {
    readonly name: string;
    readonly category: Category;
}
