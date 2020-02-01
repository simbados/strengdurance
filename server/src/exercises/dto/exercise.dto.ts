import { IsString, IsNotEmpty } from 'class-validator';

export class ExerciseDto {
        @IsString()
        @IsNotEmpty()
        readonly name: string;

        @IsString()
        @IsNotEmpty()
        readonly category: string;
}
