import {UserDto} from "src/user/dto/user.dto";

const userMockData = {_id: '5e47eb5441f38b9cbd05c3dc', username: 'test', hashedPassword: '$2b$10$.Tcgf16Lo6YObpwlEt19KetkNSPJQM3U81IbnH2mVJ.XiekA96c.u', email: 'email@email.com'};

const userMockDto: UserDto = {username: 'test', password: 'test', email: 'email@email.com'};

export {userMockData, userMockDto} 
