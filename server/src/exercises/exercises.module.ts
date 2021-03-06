import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ExerciseSchema} from '../exercises/schemas/exercise.schema';
import {ExerciseController} from '../exercises/exercises.controller';
import {ExerciseService} from '../exercises/exercises.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Exercise', schema: ExerciseSchema}])],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExercisesModule {}
