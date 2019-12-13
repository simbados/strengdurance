import { IsString } from 'class-validator';

export class ExerciseDto {
        @IsString()
        readonly name: string;

        @IsString()
        readonly category: string;
}
