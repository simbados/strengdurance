import {IsArray, ValidateNested, IsString, IsNotEmpty} from 'class-validator';
import {ExerciseDto} from '../../exercises/dto/exercise.dto';
import {Type} from 'class-transformer';

export class StrengthWorkoutEntryDto {
  @IsNotEmpty()
  @ValidateNested({each: true})
  @Type(() => ExerciseDto)
  readonly exercise: ExerciseDto;

  @IsArray()
  @IsNotEmpty()
  readonly repetition: number[];

  @IsArray()
  @IsNotEmpty()
  readonly weight: number[];

  @IsString()
  @IsNotEmpty()
  readonly comment: string;
}
