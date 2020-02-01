import { Model } from 'mongoose';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { StrengthWorkout } from './interfaces/strength_workout';
import { InjectModel } from '@nestjs/mongoose';
import { StrengthWorkoutDto } from './dto/strength_workout.dto';
import { Exercise } from '../exercises/interfaces/exercises';

@Injectable()
export class StrengthWorkoutService {
  constructor(
    @InjectModel('StrengthWorkout')
    private readonly strengthWorkoutModel: Model<StrengthWorkout>,
    @InjectModel('Exercise') private readonly exerciseModel: Model<Exercise>,
  ) {}

  async createStrengthWorkout(
    strengthWorkoutDto: StrengthWorkoutDto,
  ): Promise<StrengthWorkout> {
    const exercises = await Promise.all(
      strengthWorkoutDto.allExercises.map(async entry => {
        const model = await this.exerciseModel
          .findOne({ name: entry.exercise.name }, '_id')
          .exec();
        if (model === null || model.length == 0) {
          Logger.debug(
            `Could not find exercise from posted DTO ${JSON.stringify(
              strengthWorkoutDto,
            )}`,
          );
          throw new HttpException(
            `Could not find exercise with name ${entry.exercise.name}`,
            HttpStatus.NOT_FOUND,
          );
        }
        Logger.debug(`Found exercise ${model} and id ${model._id}`);
        return { ...entry, exercise: model._id };
      }),
    );

    Logger.debug(exercises);
    const createdStrengthWorkout = new this.strengthWorkoutModel({
      date: new Date(),
      allExercises: exercises,
    });
    Logger.debug(`Save strength workout, ${createdStrengthWorkout}`);
    return await createdStrengthWorkout.save();
  }

  async getAllStrengthWorkouts(): Promise<StrengthWorkout[]> {
    Logger.debug('getAllStrengthWorkouts called');
    return await this.strengthWorkoutModel
      .find()
      .select('-_id -__v -allExercises._id')
      .populate({ path: 'allExercises.exercise', select: '-_id -__v' })
      .exec();
  }

  // params: startDate - Date which constitutes the start date of the retrieval
  //         endDate - Date which constitutes the end date of the retrieval
  // CAUTION: Must be given as ISODate
  // return: All the workouts between to Dates beginning at startDate (inclusive) ending at endDate (inclusive)
  async getStrengthWorkoutsInTimeFrame(
    startDate: Date,
    endDate: Date,
  ): Promise<StrengthWorkout[]> {
    Logger.debug(
      `getStrengthWorkoutsInTimeFrame called, with startDate: ${startDate} and endDate: ${endDate}`,
    );
    let parsedStartDate: Date;
    let parsedEndDate: Date;
    try {
      parsedStartDate = new Date(startDate);
      parsedEndDate = new Date(endDate);
    } catch (error) {
      throw new HttpException(
        'Start Date or End date is not in a valid date format, please provide ISODate format',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.strengthWorkoutModel
      .find()
      .where('date')
      .gte(parsedStartDate)
      .lte(parsedEndDate)
      .exec();
  }
}
