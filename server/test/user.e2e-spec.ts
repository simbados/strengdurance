import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
const {MongoClient} = require('mongodb');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection, db;
  let bearer;
  const user = {username: 'test', password: 'test'}
  const dbModelUser = {_id: '5e47eb5441f38b9cbd05c3dc', username: 'test', hashedPassword: '$2b$10$.Tcgf16Lo6YObpwlEt19KetkNSPJQM3U81IbnH2mVJ.XiekA96c.u', email: 'test@test.de'};
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
    const users = db.collection('users');
    await users.insertOne(dbModelUser);
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

  afterAll(() => {
    connection.close();
    db.close();
    app.close();
  });


  describe('successful tests', () => {
    it('/profile (GET)', () => {
      return request(app.getHttpServer())
        .get('/api/v1/profile')
        .set('Authorization', 'Bearer ' + bearer)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({userId: dbModelUser._id, username: dbModelUser.username});
    });

    it('/register (POST)', () => {
      const newUser = {username: 'test123', password: 'test123', email: 'test123@test123.com'};
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .set('Authorization', 'Bearer ' + bearer)
        .send(newUser)
        .expect(201)
        .expect(response => {
          response.body.userId !== undefined;
          response.body.username === newUser.username;
          response.body.email === newUser.email
        });
    });

    it('/logout (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/logout')
        .set('Authorization', 'Bearer ' + bearer)
        .expect(200);
    });
  });
  describe('Unauthorized tests', () => {

    it('/login (POST) without username', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .set('Authorization', 'Bearer ' + bearer)
        .send({password: user.password})
        .expect(401)
        .expect(response => response.body.error === 'Unauthorized')
    });

    it('/login (POST) without password', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .set('Authorization', 'Bearer ' + bearer)
        .send({username: user.username})
        .expect(401)
        .expect(response => response.body.error === 'Unauthorized')
    });

    it('/profile (GET) without bearer', () => {
      return request(app.getHttpServer())
        .get('/api/v1/profile')
        .expect(401)
        .expect(response => response.body.error === 'Unauthorized')
    });

    it('/logout (POST)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/logout')
        .expect(401)
        .expect(response => response.body.error === 'Unauthorized')
    });
  });

  describe('Validation error tests', () => {

    it('/register (POST) without username', () => {
      const newUser = {password: 'test123', email: 'test123@test123.com'};
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .set('Authorization', 'Bearer ' + bearer)
        .send(newUser)
        .expect(400)
        .expect(response => {
          response.body.error.includes('property username has failed the following constraints: isNotEmpty');
          response.body.message === 'Validation failed, input parameters are not valid';
        })
    });

    it('/register (POST) without password', () => {
      const newUser = {username: 'testing123123', email: 'test123@test123.com'};
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .set('Authorization', 'Bearer ' + bearer)
        .send(newUser)
        .expect(400)
        .expect(response => {
          response.body.error.includes('property password has failed the following constraints: isNotEmpty');
          response.body.message === 'Validation failed, input parameters are not valid';
        })
    });

    it('/register (POST) without email', () => {
      const newUser = {username: 'testing123123', password: 'testPassword123'};
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .set('Authorization', 'Bearer ' + bearer)
        .send(newUser)
        .expect(400)
        .expect(response => {
          response.body.error.includes('property email has failed the following constraints: isNotEmpty');
          response.body.message === 'Validation failed, input parameters are not valid';
        })
    });
  });
});
