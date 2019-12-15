import {Model} from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import {StrengthWorkout} from './interfaces/strength_workout';
import {InjectModel} from '@nestjs/mongoose';
import {StrengthWorkoutDto} from './dto/strength_workout.dto';

@Injectable()
export class StrengthWorkoutService {

        constructor(@InjectModel('StrengthWorkout') private readonly strengthWorkoutModel: Model<StrengthWorkout>) {}

        async createStrengthWorkout(strengthWorkoutDto: StrengthWorkoutDto): Promise<StrengthWorkout> {
                Logger.debug(`Save StrengthDto, ${strengthWorkoutDto}`);
                const createdStrengthWorkout = new this.strengthWorkoutModel(strengthWorkoutDto);
                return await createdStrengthWorkout.save();
        }

        async getAllStrengthWorkouts(): Promise<StrengthWorkout[]> {
                return await this.strengthWorkoutModel.find().exec();
        }
}
