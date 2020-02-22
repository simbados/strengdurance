const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
import { strengthWorkoutMockData } from './strength_workout_mock';

const userObjectId = new ObjectId();
const workoutObjectId = new ObjectId();
const exerciseObjectId = new ObjectId();
const exerciseObjectId2 = new ObjectId();
const allExercises = [
  {
    repetition: [10, 10, 10],
    weight: [80, 80, 80],
    _id: '5e4936248e1302a39aaf35d0',
    exercise: exerciseObjectId,
  },
];

const strengthWorkoutDbModel = {
  _id: workoutObjectId.toHexString(),
  user: userObjectId,
  date: new Date(),
  allExercises: allExercises,
};

const exerciseDbModel = {
  _id: exerciseObjectId,
  user: userObjectId,
  name: 'Curls',
  category: 'Arms',
};

const exerciseDbModel2 = {
  _id: exerciseObjectId2,
  user: userObjectId,
  name: 'Bench',
  category: 'Chest',
};

const userDbModel = {
  _id: userObjectId,
  username: 'test',
  hashedPassword:
    '$2b$10$.Tcgf16Lo6YObpwlEt19KetkNSPJQM3U81IbnH2mVJ.XiekA96c.u',
  email: 'test@test.de',
};

export {
  strengthWorkoutDbModel,
  exerciseDbModel,
  exerciseDbModel2,
  userDbModel,
  userObjectId,
  exerciseObjectId,
};
