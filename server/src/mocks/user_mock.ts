import userMockData from "../mocks/user_mock_data";

export default class UserMockModel {
  static _id: string = undefined;
  static callStack = [];
  static findParams: Object = undefined;
  constructor() {}
  save() {
    UserMockModel.callStack.push('save');
    return this;
  }
  static find(params) {
    this.callStack.push('find');
    this.findParams = params;
    return this;
  }
  static select() {
    this.callStack.push('select');
    return this;
  }
  static findOne() {
    this.callStack.push('findOne');
    return this;
  }
  static exec(): Promise<any> {
    this.callStack.push('exec');
    return new Promise(resolve => resolve(userMockData));
  }
  static reset() {
    this.callStack = [];
  }
}

