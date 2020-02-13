import {Document} from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly hashedPassword: string;
  readonly email: string;
}
