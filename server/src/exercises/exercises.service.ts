import {Model} from 'mongoose';
import {Injectable, Logger, HttpException, HttpStatus} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {ExerciseDto} from './dto/exercise.dto';
import {Exercise} from './interfaces/exercises';
import Category from './categories';

@Injectable()
export class ExerciseService {
        constructor(@InjectModel('Exercise') private readonly exerciseModel: Model<Exercise>) {
        }

        validateCategory(category: string) {
                if (!Category.includes(category)) throw new HttpException(`Category must be of type ${Category.toString()}`, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        async postExercise(exerciseDto: ExerciseDto): Promise<Exercise> {
                this.validateCategory(exerciseDto.category.toString());
                Logger.debug(`Save items, ${exerciseDto}`);
                const createdExercise = new this.exerciseModel(exerciseDto);
                return await createdExercise.save();
        }

        async getAllExercises(): Promise<Exercise[]> {
                return await this.exerciseModel.find().exec();
        }

        async getExercisesByCategory(category: string): Promise<Exercise[]> {
                this.validateCategory(category);
                return await this.exerciseModel.find({ category });
        }
}
