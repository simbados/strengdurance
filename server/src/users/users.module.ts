import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from 'src/users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Users', schema: UserSchema}])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
