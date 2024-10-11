import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class LogInDto {

  @IsEmail({}, { message: 'Email must be a valid email address' }) 
  @IsNotEmpty({ message: 'Email field cannot be empty' }) 
  @Transform(({ value }) => value.toLowerCase().trim()) 
  email: string;

  @IsNotEmpty({ message: 'Password field cannot be empty' })
  password: string;
}
