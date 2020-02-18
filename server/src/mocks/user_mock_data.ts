import {User} from "../user/interfaces/user";
import {UserDto} from "src/user/dto/user.dto";

const userMockData: User = {username: 'test', hashedPassword: '$2b$10$.Tcgf16Lo6YObpwlEt19KetkNSPJQM3U81IbnH2mVJ.XiekA96c.u', email: 'email@email.com'};

const userMockDto: UserDto = {username: 'test', password: 'test', email: 'email@email.com'};

export {userMockData, userMockDto} 
