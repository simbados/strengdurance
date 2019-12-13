import { Controller, Get, Post, Logger, Body } from '@nestjs/common';
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
        async postExercise(@Body() exerciseDto: ExerciseDto): Promise<Exercise> {
                Logger.log('Post /exercises');
                Logger.log(`Dto is: , ${exerciseDto}`);
                return this.exerciseService.postExercise(exerciseDto);
        }
}
