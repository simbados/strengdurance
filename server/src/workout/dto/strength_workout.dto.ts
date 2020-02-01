import {IsArray, ValidateNested, IsNotEmpty} from 'class-validator';
import {StrengthWorkoutEntryDto} from './strength_workout_entry.dto';
import {Type} from 'class-transformer';

export class StrengthWorkoutDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({each: true})
  @Type(() => StrengthWorkoutEntryDto)
  readonly allExercises: [StrengthWorkoutEntryDto];
}
