import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {Connection} from 'mongoose';
const {MongoClient} = require('mongodb');

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection, db;
  let bearer;
  const user = {username: 'test', password: 'test'}
  const dbModelUser = {_id: '5e47eb5441f38b9cbd05c3dc', username: 'test', hashedPassword: '$2b$10$.Tcgf16Lo6YObpwlEt19KetkNSPJQM3U81IbnH2mVJ.XiekA96c.u', email: 'test@test.de'};
  console.log(process.env);
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
      .then(response => {
        bearer = response.body.access_token
      });
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
    await app.close();
  });

  it('/profile (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/profile')
      .set('Authorization', 'Bearer ' + bearer)
      .expect(200)
      .expect({userId: dbModelUser._id, username: dbModelUser.username});
  });

  /* it('/logout (POST)', () => { */
  /*   return request(app.getHttpServer()) */
  /*     .post('/api/v1/auth/logout') */
  /*     .set('Authorization', 'Bearer ' + bearer) */
  /*     .expect(200); */
  /* }); */
});
