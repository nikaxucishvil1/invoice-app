import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.usersService.findQuery({ email });
    if (user) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.usersService.create({ email, password: hashedPassword });
    return {
      success: true,
      message: 'User Registerd succesfully',
      status: 201,
    };
  }

  async signIn(singInDto: SignInDto) {
    const { email, password } = singInDto;
    const user = await this.usersService.findQuery({ email });
    if (!user) throw new BadRequestException('Invalid Credentials');
    const isPasssowrdCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasssowrdCorrect)
      throw new BadRequestException('Invalid Credentials');
    const payload = {
      sub: user._id,
    };
    const expire = '7d';

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: expire,
      }),
    };
  }

  getCurrentUser(req) {
    return this.usersService.findOne(req.userId);
  }
}
