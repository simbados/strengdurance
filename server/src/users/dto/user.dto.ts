import {IsString, IsNotEmpty} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
