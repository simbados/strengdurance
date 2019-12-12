import {Model} from 'mongoose';
import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ExerciseDto} from './dto/exercise.dto';
import {Exercise} from './interfaces/exercises';

@Injectable()
export class ExerciseService {

        constructor(@InjectModel('Exercise') private readonly exerciseModel: Model<Exercise>) {
        }

        async postExercise(exerciseDto: ExerciseDto): Promise<Exercise> {
                Logger.debug(`Save items, ${exerciseDto}`);
                const createdExercise = new this.exerciseModel(exerciseDto);
                return await createdExercise.save();
        }

        async getAllExercises(): Promise<Exercise[]> {
                return await this.exerciseModel.find().exec();
        }
}
