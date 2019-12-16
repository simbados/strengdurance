import { IsArray } from 'class-validator';
import {Exercise} from '../../exercises/interfaces/exercises';

export class StrengthWorkoutDto {
        @IsArray()
        readonly allExercises: [
                {
                        exercise: Exercise,
                        repetition: number[],
                }
        ]
}
