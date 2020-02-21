import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  userDbModel,
  exerciseDbModel,
  userObjectId,
} from '../src/mocks/dbModel_mock_data';
const { MongoClient } = require('mongodb');

describe('WorkoutController (e2e)', () => {
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
    const users = db.collection('users');
    await users.insertOne(userDbModel);
    const exercises = db.collection('exercises');
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
        bearer = response.body.access_token;
      });
  });

  afterAll(async () => {
    const users = db.collection('users');
    await users.deleteMany({});
    const exercises = db.collection('exercise');
    exercises.deleteMany({});
    await connection.close();
    return app.close();
  });

  describe('successful tests', () => {
    it('/exercises/strength (GET)', async () => {
      const expectedExercises = [
        {
          user: userObjectId.toHexString(),
          name: exerciseDbModel.name,
          category: exerciseDbModel.category,
        },
      ];
      return request(app.getHttpServer())
        .get('/api/v1/exercises/strength')
        .set('Authorization', 'Bearer ' + bearer)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(expectedExercises);
    });
  });
});
