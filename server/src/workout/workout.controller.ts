import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StrengthWorkoutService } from './strength_workout.service';
import { StrengthWorkout } from './interfaces/strength_workout';
import { StrengthWorkoutDto } from './dto/strength_workout.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/workouts')
export class WorkoutController {
  constructor(
    private readonly strengthWorkoutService: StrengthWorkoutService,
  ) {}

  @Get('strength')
  async getAllStrengthWorkouts(@Request() req): Promise<StrengthWorkout[]> {
    console.log('user id is ', req.user.userId);
    return this.strengthWorkoutService.getAllStrengthWorkouts(req.user.userId);
  }

  @Get('strength/:startDate/:endDate')
  async getStrengthWorkoutsInTimeFrame(
    @Request() req,
    @Param() params,
  ): Promise<StrengthWorkout[]> {
    return this.strengthWorkoutService.getStrengthWorkoutsInTimeFrame(
      req.user.userId,
      params.startDate,
      params.endDate,
    );
  }

  @Post('strength')
  async createStrengthWorkout(
    @Request() req,
    @Body() strengthWorkoutDto: StrengthWorkoutDto,
  ): Promise<StrengthWorkout> {
    return this.strengthWorkoutService.createStrengthWorkout(
      req.user.userId,
      strengthWorkoutDto,
    );
  }

  // @Post('strength')
  // async deleteStrengthWorkout(
  //     @Request() req,
  //     @Body() strengthWorkoutDto: StrengthWorkoutDto,
  // ): Promise<StrengthWorkout> {
  //   return this.strengthWorkoutService.deleteStrengthWorkout(
  //       req.user.userId,
  //       strengthWorkoutDto,
  //   );
  // }
}
