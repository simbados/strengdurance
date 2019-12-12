import { Controller, Get, Post } from '@nestjs/common';
import {ExerciseService} from './exercises.service';
import {Exercise} from './interfaces/exercises';
import {ExerciseDto} from './dto/exercise.dto';

@Controller('exercises')
export class ExerciseController {
        constructor(private readonly exerciseService: ExerciseService){}

        @Get()
        async getAllExercises(): Promise<Exercise[]> {
                return await this.exerciseService.getAllExercises();
        } 

        @Post()
        async postExercise(exerciseDto: ExerciseDto): Promise<Exercise> {
                return this.exerciseService.postExercise(exerciseDto);
        }
}
