import {userMockData} from "./user_mock_data";
import {User} from '../user/interfaces/user';

export default class UserMockService {
  async findOne(): Promise<User> {
    return undefined;
  }
  async createNewUser(): Promise<User> {
    return undefined;
  }
  async hashPasssword() {
    return userMockData.hashedPassword;
  }
}
