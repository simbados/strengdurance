import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {exerciseMockData} from '../src/mocks/exercise_mock_data';
import {strengthWorkoutMockData} from '../src/mocks/strength_workout_mock';
import {WorkoutModule} from '../src/workout/workout.module';
import {AppModule} from '../src/app.module';
const {MongoClient} = require('mongodb');

describe('WorkoutController (e2e)', () => {
  let app: INestApplication;
  let connection, db;
  let bearer;
  const user = {username: 'test', password: 'test'}
  const strengthWorkoutDbModel = {_id: '5e47eb5211f08b9cbd05c3dc', user: '5e47eb5441f38b9cbd15c4kc', date: strengthWorkoutMockData[0].date, allExercises: strengthWorkoutMockData[0].allExercises}
  const exerciseDbModel = {
    _id: '5e47eb5211f08b9cbd05c3dc', user: '5e47eb5441f38b9cbd15c4kc', name: exerciseMockData[0].name, category: exerciseMockData[0].category
  };
  const dbModelUser = {_id: '5e47eb5441f38b9cbd05c3dc', username: 'test', hashedPassword: '$2b$10$.Tcgf16Lo6YObpwlEt19KetkNSPJQM3U81IbnH2mVJ.XiekA96c.u', email: 'test@test.de'};

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
    const users = db.collection('users');
    await users.insertOne(dbModelUser);
    const workouts = db.collection('StrengthWorkout');
    const exercises = db.collection('Exercise');
    await workouts.insertOne(strengthWorkoutDbModel);
    await exercises.insertOne(exerciseDbModel);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send(user)
      .expect(200)
      .then(response => {
        bearer = response.body.access_token
      });
  });

  afterAll(async () => {
    const users = db.collection('users');
    await users.deleteMany({});
    const workouts = db.collection('StrengthWorkout');
    const exercises = db.collection('Exercise');
    workouts.deleteMany({});
    exercises.deleteMany({});
    await connection.close();
    await db.close();
    await app.close();
  });


  describe('successful tests', () => {
    it('/profile (GET)', () => {
      console.log(bearer);
    });
  });
});
