import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  userDbModel,
  exerciseDbModel,
  userObjectId,
  exerciseDbModel2,
} from '../src/mocks/dbModel_mock_data';
const { MongoClient } = require('mongodb');

describe('ExerciseController (e2e)', () => {
  let app: INestApplication;
  let connection, db;
  let bearer;
  const user = { username: 'test', password: 'test' };

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  beforeEach(async () => {
    console.log('before Each called');
    const users = db.collection('users');
    await users.deleteMany({});
    const exercises = db.collection('exercises');
    await exercises.deleteMany({});
    await users.insertOne(userDbModel);
    await exercises.insertOne(exerciseDbModel);
    await exercises.insertOne(exerciseDbModel2);
    const exercisesAll = await exercises
      .find({ user: userDbModel._id })
      .toArray();
    console.log(exercisesAll);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send(user)
      .expect(200)
      .then(response => {
        bearer = response.body.access_token;
      });
  });

  afterAll(async () => {
    const users = db.collection('users');
    await users.deleteMany({});
    const exercises = db.collection('exercises');
    exercises.deleteMany({});
    await connection.close();
    return app.close();
  });

  describe('successful tests', () => {
    it('/exercises/strength (GET)', () => {
      const expectedExercises = [
        {
          user: userDbModel._id.toHexString(),
          name: exerciseDbModel.name,
          category: exerciseDbModel.category,
        },
        {
          user: userDbModel._id.toHexString(),
          name: exerciseDbModel2.name,
          category: exerciseDbModel2.category,
        },
      ];
      return request(app.getHttpServer())
        .get('/api/v1/exercises/strength')
        .set('Authorization', 'Bearer ' + bearer)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(expectedExercises);
    });

    it('/exercises/strength/category (GET)', () => {
      const expectedExercises = [
        {
          user: userDbModel._id.toHexString(),
          name: exerciseDbModel2.name,
          category: exerciseDbModel2.category,
        },
      ];
      const requestURL = '/api/v1/exercises/strength/Chest';
      return request(app.getHttpServer())
        .get(requestURL)
        .set('Authorization', 'Bearer ' + bearer)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(expectedExercises);
    });

    it('/exercises/strength (POST)', () => {
      const expectedExercises = {
        user: userDbModel._id.toHexString(),
        name: 'Test Exercise',
        category: 'Arms',
      };
      const postedExercise = {
        name: 'Test Exercise',
        category: 'Arms',
      };
      return request(app.getHttpServer())
        .post('/api/v1/exercises/strength')
        .set('Authorization', 'Bearer ' + bearer)
        .send(postedExercise)
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(expectedExercises);
    });
  });
});
