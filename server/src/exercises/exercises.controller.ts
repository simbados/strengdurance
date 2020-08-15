import {
  Controller,
  Get,
  Request,
  Post,
  Logger,
  Body,
  Param,
  UseGuards, Delete,
} from '@nestjs/common';
import { ExerciseService } from './exercises.service';
import { Exercise } from './interfaces/exercises';
import { ExerciseDto } from './dto/exercise.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('strength')
  async getAllExercises(@Request() req): Promise<Exercise[]> {
    return this.exerciseService.getAllExercises(req.user.userId);
  }

  @Get('strength/:category')
  async getExercisesByCategory(
    @Request() req,
    @Param() params,
  ): Promise<Exercise[]> {
    return this.exerciseService.getExercisesByCategory(
      params.category,
      req.user.userId,
    );
  }

  @Post('strength')
  async postStrengthExercise(
    @Request() req,
    @Body() exerciseDto: ExerciseDto,
  ): Promise<Exercise> {
    Logger.log('Post /exercises');
    Logger.log(`Dto is: , ${exerciseDto}, userId is: ${req.user.userId}`);
    return this.exerciseService.postExercise(exerciseDto, req.user.userId);
  }

  @Delete('strength')
  async deleteStrengthExercise(
      @Request() req,
      @Body() exerciseDto: ExerciseDto,
  ): Promise<Exercise> {
    Logger.log('delete /exercises');
    Logger.log(`Dto is: , ${exerciseDto}, userId is: ${req.user.userId}`);
    return this.exerciseService.deleteStrengthExercise(exerciseDto, req.user.userId);
  }
}
