import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import {ExerciseService} from '../exercises/exercises.service';
import {ExerciseSchema} from '../exercises/schemas/exercise.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}, {name: 'Exercise', schema: ExerciseSchema}])],
  providers: [UserService, ExerciseService],
  exports: [UserService],
})
export class UserModule {}
