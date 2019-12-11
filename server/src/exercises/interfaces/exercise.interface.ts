import { Document } from 'mongoose';

export interface Exercise extends Document {
    readonly name: string;
    readonly category: Category;
}
