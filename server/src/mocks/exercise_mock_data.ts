import Category from '../exercises/categories';
import {User} from '../user/interfaces/user';

const testId: string = 'testId';
const testUserId: string = 'testUserId';
const userMockData: User = {username: 'test', hashedPassword: 'hash', email: 'email@email.com'};

const exerciseMockModelData = [
  {name: 'Curls', category: Category[0], user: testUserId},
  {name: 'Pushdowns', category: Category[0], user: testUserId},
  {name: 'Bench', category: Category[2], user: testUserId},
];
export {exerciseMockModelData, testId, userMockData};
