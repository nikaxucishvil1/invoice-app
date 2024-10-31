import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    example: 'nika@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @Length(8, 16)
  @ApiProperty({
    example: 'Nika123!',
  })
  password: string;
}
