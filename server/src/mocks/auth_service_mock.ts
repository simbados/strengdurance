export default class AuthMockService {
  async validateUser(): Promise<any> {
    return undefined;
  }
  async checkBlacklist(): Promise<boolean> {
    return undefined;
  }
  async addToBlacklist() {
  }
  async login() {
    return 'jwt';
  }
}
