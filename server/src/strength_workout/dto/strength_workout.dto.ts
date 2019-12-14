import { IsObject, IsDate } from 'class-validator';
import {Exercise} from '../../exercises/interfaces/exercises';

export class StrengthWorkoutDto {
        @IsDate()
        readonly date: Date;

        @IsObject()
        readonly allExercises: [
                {
                        exercise: Exercise,
                        repetitions: [Number],
                }
        ]        
}
