import {Document} from 'mongoose';
import {Exercise} from '../../exercises/interfaces/exercises';
import {User} from '../../user/interfaces/user';

export interface StrengthWorkout extends Document {
  readonly user: User;
  readonly date: Date;
  readonly allExercises: [
    {
      readonly exercise: Exercise;
      readonly repetition: number[];
      readonly weight: number[];
      readonly comment: string;
    },
  ];
}
