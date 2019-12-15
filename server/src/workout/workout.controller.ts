import { Controller, Get, Post, Body } from '@nestjs/common';
import {StrengthWorkoutService} from './strength_workout.service';
import {StrengthWorkout} from './interfaces/strength_workout';
import {StrengthWorkoutDto} from './dto/strength_workout.dto';

@Controller('workouts')
export class WorkoutController {
        constructor(private readonly strengthWorkoutService: StrengthWorkoutService){}

        @Get('strength')
        async getAllStrengthWorkouts(): Promise<StrengthWorkout[]> {
                return this.strengthWorkoutService.getAllStrengthWorkouts();
        } 

        @Post('strength')
        async createStrengthWorkout(@Body() strengthWorkoutDto: StrengthWorkoutDto): Promise<StrengthWorkout> {
                return this.strengthWorkoutService.createStrengthWorkout(strengthWorkoutDto);
        }

}
