import Category from '../exercises/categories';
import { userMockData } from '../mocks/user_mock_data';
import { Exercise } from '../exercises/interfaces/exercises';
import { exerciseDbModel } from './dbModel_mock_data';

const testId: string = 'testId';
const testUserId: string = 'testUserId';

const exerciseMockModelData = [
  { _id: 1, name: 'Curls', category: Category[2], user: testUserId },
  { _id: 2, name: 'Pushdowns', category: Category[0], user: testUserId },
  { _id: 3, name: 'Bench', category: Category[1], user: testUserId },
];

const exerciseMockData: Exercise[] = [
  { _id: 1, name: 'Curls', category: Category[2], user: { ...userMockData } },
  { _id: 2, name: 'Pushdowns', category: Category[0], user: { ...userMockData } },
  { _id: 3, name: 'Bench', category: Category[1], user: { ...userMockData } },
];

const exerciseMockDataToObject = {
  _id: 1,
  name: 'Curls',
  category: Category[2],
  user: testUserId,
  toObject() {
    return { ...exerciseDbModel, user: testUserId };
  },
};
export {
  exerciseMockModelData,
  testId,
  exerciseMockData,
  exerciseMockDataToObject,
};
