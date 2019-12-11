import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ExerciseSchema} from 'src/exercises/schemas/exercise.schema';
import {ExerciseController} from 'src/exercises/exercise.controller';
import {ExerciseService} from 'src/exercises/exercise.service';

@Module({
        imports: [MongooseModule.forFeature([{name: 'Exercise', schema: ExerciseSchema}])],
        controllers: [ExerciseController],
        providers: [ExerciseService],
})
export class ExercisesModule {}
