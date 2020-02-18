export default class BlacklistMockModel {
  static _id: string = undefined;
  static callStack = [];
  static findParams: Object = undefined;
  constructor() {}
  save() {
    BlacklistMockModel.callStack.push('save');
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
    return new Promise(resolve => resolve({createdAt: Date.now(), jwt: 'testJwt'}));
  }
  static reset() {
    this.callStack = [];
  }
}

