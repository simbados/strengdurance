import {Controller, Get, Post, Logger, Body, Param, UseGuards} from '@nestjs/common';
import {ExerciseService} from './exercises.service';
import {Exercise} from './interfaces/exercises';
import {ExerciseDto} from './dto/exercise.dto';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('strength')
  async getAllExercises(): Promise<Exercise[]> {
    return this.exerciseService.getAllExercises();
  }

  @Get('strength/:category')
  async getExercisesByCategory(@Param() params): Promise<Exercise[]> {
    return this.exerciseService.getExercisesByCategory(params.category);
  }

  @Post('strength')
  async postExercise(@Body() exerciseDto: ExerciseDto): Promise<Exercise> {
    Logger.log('Post /exercises');
    Logger.log(`Dto is: , ${exerciseDto}`);
    return this.exerciseService.postExercise(exerciseDto);
  }
}
