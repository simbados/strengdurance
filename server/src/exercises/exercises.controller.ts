import { Controller, Get, Post, Logger, Body, Param } from '@nestjs/common';
import {ExerciseService} from './exercises.service';
import {Exercise} from './interfaces/exercises';
import {ExerciseDto} from './dto/exercise.dto';

@Controller('api/v1/exercises')
export class ExerciseController {
        constructor(private readonly exerciseService: ExerciseService){}

        @Get()
        async getAllExercises(): Promise<Exercise[]> {
                return this.exerciseService.getAllExercises();
        } 

        @Get('/:category')
        async getExercisesByCategory(@Param() params): Promise<Exercise[]> {
                return this.exerciseService.getExercisesByCategory(params.category);
        } 

        @Post()
        async postExercise(@Body() exerciseDto: ExerciseDto): Promise<Exercise> {
                Logger.log('Post /exercises');
                Logger.log(`Dto is: , ${exerciseDto}`);
                return this.exerciseService.postExercise(exerciseDto);
        }
}
