import {Document} from 'mongoose';
import {Exercise} from '../../exercises/interfaces/exercises';

export interface StrengthWorkout extends Document {
        readonly date: Date,
        readonly allExercises: [
                {
                        readonly exercise: Exercise,
                        readonly repetition: number[],
                }
        ];
}
