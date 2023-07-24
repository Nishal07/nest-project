import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateContactsDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  contactName: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email: string;

  @IsString()
  @IsNotEmpty()
  contactnumber: string;

  @IsNotEmpty()
  userId: number;
}
