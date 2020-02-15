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

  async checkForDuplicatedName(name: string, userId: string) {
    // TODO: validation maybe for all similiar names to
    const model = await this.exerciseModel.find({name: name, user: userId});
    console.log('model is', model);
    Logger.debug(model);
    if (model.length !== 0) {
      throw new HttpException('Exercise name is already in use', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async postExercise(exerciseDto: ExerciseDto, userId: string): Promise<Exercise> {
    this.validateCategory(exerciseDto.category.toString());
    await this.checkForDuplicatedName(exerciseDto.name, userId);
    Logger.debug(`Save items, ${exerciseDto}`);
    const exerciseToStore = {...exerciseDto, user: userId};
    const createdExercise = new this.exerciseModel(exerciseToStore);
    return await createdExercise.save();
  }

  async getAllExercises(userId: string): Promise<Exercise[]> {
    const dbExercises = await this.exerciseModel.find({user: userId}).select('-_id -__v').exec();
    // Find exercises independent of the user
    const defaultExercises = await this.exerciseModel.find({user: {$exists: false}});
    console.log('default exercises are', defaultExercises.length);
    const finalExercises = dbExercises.concat(defaultExercises);
    return finalExercises;
  }

  async getExercisesByCategory(category: string, userId: string): Promise<Exercise[]> {
    this.validateCategory(category);
    return await this.exerciseModel.find({category, user: userId}).exec();
  }
}
