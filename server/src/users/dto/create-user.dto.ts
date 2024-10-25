import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @Length(8,16)
  password: string;
}
