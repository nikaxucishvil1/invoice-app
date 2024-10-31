import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    schema: {
      example: {
        success: true,
        message: 'User registered successfully',
        status: 201,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'User already exists.',
  })
  signUp(@Body() craeteUserDto: CreateUserDto) {
    return this.authService.signUp(craeteUserDto);
  }

  @Post('signIn')
  @ApiOkResponse({
    description: 'User signed in successfully.',
    schema: {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzFjZDgyY2FhMWZkYzg0ZWE3NDNlM2UiLCJpYXQiOjE3Mjk5NDM2MDcsImV4cCI6MTczMDU0ODQwN30.FcjVtLKWO9nklib2h5cQyu2XpGc6znMzvEZYx_jw0V4',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid credentials provided.',
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('currentUser')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'User found successfully.',
    schema: {
      example: {
        _id: '671cd82caa1fdc84ea743e3e',
        email: 'nika@gmail.com',
        invoice: ['671cd96352d6536ad43e3d5e'],
        __v: 0,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  getCurrentUser(@Req() req) {
    return this.authService.getCurrentUser(req);
  }

  @Delete('deleteCurrentUser')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User deleted successfully.',
    schema: {
      example: {
        status: 204,
        message: 'User deleted successfully',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized access.',
  })
  deleteCurUser(@Req() req) {
    return this.authService.deleteCurrentUser(req);
  }

  @Patch('user')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User updated successfully.',
    schema: {
      example: {
        _id: '67234c6f21f22aad9429a2b5',
        email: 'saba@gmail.com',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })

  updUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(req, updateUserDto);
  }
}
