import {Model} from 'mongoose';
import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Exercise} from 'src/exercises/interfaces/exercise.interface';
import {ExerciseDto} from 'src/exercises/dto/exercise.dto';

@Injectable()
export class ExerciseService {

        constructor(@InjectModel('Order') private readonly exerciseModel: Model<Exercise>) {
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
