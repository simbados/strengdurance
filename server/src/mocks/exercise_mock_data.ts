import Category from '../exercises/categories';

const testId: string = 'testId';
const testUserId: string = 'testUserId';

const exerciseMockModelData = [
  {name: 'Curls', category: Category[0], user: testUserId},
  {name: 'Pushdowns', category: Category[0], user: testUserId},
  {name: 'Bench', category: Category[2], user: testUserId},
];
export {exerciseMockModelData, testId};
