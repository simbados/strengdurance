import {IsString, IsNotEmpty, IsEmail} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
