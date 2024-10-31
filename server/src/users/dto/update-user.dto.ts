import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'nika@gmail.com',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'Nika123!',
  })
  password?: string;
}
