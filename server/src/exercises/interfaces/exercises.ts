import {Document} from 'mongoose';
import {User} from 'src/user/interfaces/user';

export interface Exercise extends Document {
  readonly user: User;
  readonly name: string;
  readonly category: string;
}
