import { Module } from '@nestjs/common';

@Module({
        imports: [MongooseModule.forFeature([{name: 'StrengthWorkout', schema: StrengthWorkoutSchema}])],
        controllers: [StrengthWorkoutController],
        providers: [StrengthWorkoutService],
})
export class WorkoutModule {}
