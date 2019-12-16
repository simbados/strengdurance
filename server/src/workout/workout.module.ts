import {Module} from '@nestjs/common';
import {WorkoutController} from './workout.controller';
import {StrengthWorkoutSchema} from './schemas/strength_workout.schema';
import {MongooseModule} from '@nestjs/mongoose';
import {StrengthWorkoutService} from './strength_workout.service';
import {ExerciseSchema} from '../exercises/schemas/exercise.schema';

@Module({
        imports: [MongooseModule.forFeature([{name: 'StrengthWorkout', schema: StrengthWorkoutSchema}, {name: 'Exercise', schema: ExerciseSchema}])],
        providers: [StrengthWorkoutService],
        controllers: [WorkoutController]
})
export class WorkoutModule {}
