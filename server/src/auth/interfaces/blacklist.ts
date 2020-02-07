import {Document} from 'mongoose';

export interface Blacklist extends Document {
  readonly createdAt: Date;
  readonly jwt: string;
}
