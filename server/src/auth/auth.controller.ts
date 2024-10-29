import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() craeteUserDto: CreateUserDto) {
    return this.authService.signUp(craeteUserDto);
  }

  @Post('signIn')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('currentUser')
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() req) {
    return this.authService.getCurrentUser(req);
  }

  @Delete('deleteCurrentUser')
  @UseGuards(AuthGuard)
  deleteCurUser(@Req() req) {
   return this.authService.deleteCurrentUser(req)
  }
}
