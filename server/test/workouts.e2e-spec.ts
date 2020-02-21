import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  userDbModel,
  exerciseDbModel,
  strengthWorkoutDbModel,
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
    const workouts = db.collection('strengthworkouts');
    const exercises = db.collection('exercises');
    await exercises.insertOne(exerciseDbModel);
    await workouts.insertOne(strengthWorkoutDbModel);
    console.log(await users.findOne());
    console.log(await workouts.findOne());
    console.log(await exercises.findOne());
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
    const workouts = db.collection('strengthworkout');
    const exercises = db.collection('exercise');
    workouts.deleteMany({});
    exercises.deleteMany({});
    await connection.close();
    return app.close();
  });

  describe('successful tests', () => {
    it('/workouts/strength (GET)', async () => {
      const expectedResult = [
        {
          user: userObjectId.toHexString(),
          date: strengthWorkoutDbModel.date.toISOString(),
          allExercises: [
            {
              repetition: strengthWorkoutDbModel.allExercises[0].repetition,
              weight: strengthWorkoutDbModel.allExercises[0].weight,
              exercise: {
                name: exerciseDbModel.name,
                category: exerciseDbModel.category,
                user: userObjectId.toHexString(),
              },
            },
          ],
        },
      ];
      return request(app.getHttpServer())
        .get('/api/v1/workouts/strength')
        .set('Authorization', 'Bearer ' + bearer)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(expectedResult);
    });

    it('/workouts/strength/startDate/endDate (GET)', async () => {
      const startDate = new Date('2000-01-16').toISOString();
      const endDate = new Date('3000-12-15').toISOString();
      const expectedResult = [
        {
          user: userObjectId.toHexString(),
          date: strengthWorkoutDbModel.date.toISOString(),
          allExercises: [
            {
              repetition: strengthWorkoutDbModel.allExercises[0].repetition,
              weight: strengthWorkoutDbModel.allExercises[0].weight,
              exercise: {
                name: exerciseDbModel.name,
                category: exerciseDbModel.category,
                user: userObjectId.toHexString(),
              },
            },
          ],
        },
      ];
      return request(app.getHttpServer())
        .get(`/api/v1/workouts/strength/${startDate}/${endDate}`)
        .set('Authorization', 'Bearer ' + bearer)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(expectedResult);
    });

    it('/workouts/strength (POST)', async () => {
      const body = {
        allExercises: [
          {
            exerciseDefinition: {
              name: exerciseDbModel.name,
              category: exerciseDbModel.category,
            },
            repetition: [10, 10, 10],
            weight: [80, 80, 80],
            comment: 'schwer',
          },
        ],
      };
      const expectedResponse = {
        allExercises: [
          {
            exercise: {
              name: exerciseDbModel.name,
              category: exerciseDbModel.category,
              user: userObjectId.toHexString(),
            },
            repetition: [10, 10, 10],
            weight: [80, 80, 80],
            comment: 'schwer',
          },
        ],
      };
      return request(app.getHttpServer())
        .post('/api/v1/workouts/strength')
        .set('Authorization', 'Bearer ' + bearer)
        .send(body)
        .expect(201)
        .expect('Content-Type', /json/)
        .then(response => {
          const workout = response.body[0];
          expect(workout.date).toBeDefined();
          expect(workout.user).toEqual(userObjectId.toHexString());
          expect(workout.allExercises).toEqual(expectedResponse.allExercises);
        });
    });
  });
});
