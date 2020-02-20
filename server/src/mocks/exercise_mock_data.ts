import Category from '../exercises/categories';
import {userMockData} from '../mocks/user_mock_data';
import {Exercise} from '../exercises/interfaces/exercises';

const testId: string = 'testId';
const testUserId: string = 'testUserId';

const exerciseMockModelData = [
  {name: 'Curls', category: Category[0], user: testUserId},
  {name: 'Pushdowns', category: Category[0], user: testUserId},
  {name: 'Bench', category: Category[2], user: testUserId},
];

const exerciseMockData: Exercise[] = [
  {name: 'Curls', category: Category[0], user: {...userMockData}},
  {name: 'Pushdowns', category: Category[0], user: {...userMockData}},
  {name: 'Bench', category: Category[2], user: {...userMockData}},
]
export {exerciseMockModelData, testId, exerciseMockData};
