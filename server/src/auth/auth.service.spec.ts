import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {AuthService} from './auth.service';
import {UserService} from '../user/user.service';
import UserMockService from '../mocks/user_service_mock';
import BlacklistMockModel from '../mocks/blacklist_mock';
import {JwtService} from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  const jwtMockService = function () {
    function sign() {
      return 'testJwt';
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: new UserMockService(),
        },
        AuthService,
        {
          provide: JwtService,
          useValue: jwtMockService,
        },
        {
          provide: getModelToken('Blacklist'),
          useValue: BlacklistMockModel,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
