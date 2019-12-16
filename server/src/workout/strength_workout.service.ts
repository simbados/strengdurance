import {Model} from 'mongoose';
import {Injectable, Logger, HttpException, HttpStatus} from '@nestjs/common';
import {StrengthWorkout} from './interfaces/strength_workout';
import {InjectModel} from '@nestjs/mongoose';
import {StrengthWorkoutDto} from './dto/strength_workout.dto';
import {Exercise} from '../exercises/interfaces/exercises';

@Injectable()
export class StrengthWorkoutService {

        constructor(@InjectModel('StrengthWorkout') private readonly strengthWorkoutModel: Model<StrengthWorkout>,
                @InjectModel('Exercise') private readonly exerciseModel: Model<Exercise>) {}

        async createStrengthWorkout(strengthWorkoutDto: StrengthWorkoutDto): Promise<StrengthWorkout> {
                const exercises = await Promise.all(strengthWorkoutDto.allExercises.map(async (entry) => {
                        const model = await this.exerciseModel.find({name: entry.exercise.name, category: entry.exercise.category}, '_id').exec();
                        if (model.length == 0) {throw new HttpException(`Could not find exercise with name ${entry.exercise.name} and category ${entry.exercise.category}`, HttpStatus.NOT_FOUND)}
                        Logger.debug(`Found exercise with id ${model.id}`);
                        return {exercise: model.id, repetition: entry.repetition};
                }));

                Logger.debug(`all Exercises Id array: ${exercises.toString()}`);
                const createdStrengthWorkout = new this.strengthWorkoutModel(
                        {
                                date: new Date(),
                                allExercises: exercises,
                        }
                );
                Logger.debug(`Save strength workout, ${createdStrengthWorkout}`);
                return await createdStrengthWorkout.save();
        }

        async getAllStrengthWorkouts(): Promise<StrengthWorkout[]> {
                Logger.debug('getAllStrengthWorkouts called');
                return await this.strengthWorkoutModel.find().exec();
        }
}
