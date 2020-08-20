import { IsString, IsNotEmpty } from 'class-validator';

export class ExerciseDto {
        @IsString()
        @IsNotEmpty()
        name: string;

        @IsString()
        @IsNotEmpty()
        category: string;
}
