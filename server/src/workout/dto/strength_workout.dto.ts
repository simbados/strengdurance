import {IsArray} from 'class-validator';

export class StrengthWorkoutDto {
  @IsArray()
  readonly allExercises: [
    {
      exerciseName: string;
      repetition: number[];
      weight: number[];
      comment: string;
    },
  ];
}
