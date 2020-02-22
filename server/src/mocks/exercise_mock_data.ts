import Category from '../exercises/categories';
import { userMockData } from '../mocks/user_mock_data';
import { Exercise } from '../exercises/interfaces/exercises';
import { exerciseDbModel } from './dbModel_mock_data';

const testId: string = 'testId';
const testUserId: string = 'testUserId';

const exerciseMockModelData = [
  { name: 'Curls', category: Category[2], user: testUserId },
  { name: 'Pushdowns', category: Category[0], user: testUserId },
  { name: 'Bench', category: Category[1], user: testUserId },
];

const exerciseMockData: Exercise[] = [
  { name: 'Curls', category: Category[2], user: { ...userMockData } },
  { name: 'Pushdowns', category: Category[0], user: { ...userMockData } },
  { name: 'Bench', category: Category[1], user: { ...userMockData } },
];

const exerciseMockDataToObject = {
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
