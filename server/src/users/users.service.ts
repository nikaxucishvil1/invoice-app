import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findOne(id) {
    return this.userModel.findById(id);
  }
  findQuery(query) {
    return this.userModel.findOne(query).select('+password');
  }
}
