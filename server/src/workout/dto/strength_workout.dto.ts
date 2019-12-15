import { IsDate, IsArray } from 'class-validator';
import {Exercise} from '../../exercises/interfaces/exercises';

export class StrengthWorkoutDto {
        @IsDate()
        readonly date: Date;

        @IsArray()
        readonly allExercises: [
                {
                        exercise: Exercise,
                        repetition: number[],
                }
        ]
}
