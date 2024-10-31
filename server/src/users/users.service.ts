import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findOne(id) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findQuery(query) {
    const user = this.userModel.findOne(query).select('+password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async addInvoice(
    userId: mongoose.Types.ObjectId,
    invoiceId: mongoose.Types.ObjectId,
  ) {
    if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
      throw new NotFoundException('Invalid ID format');
    }
    const user = await this.userModel.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    if (!invoiceId) throw new BadRequestException('Invalid post ID');
    user.invoice.push(invoiceId);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { invoice: user.invoice },
      { new: true },
    );
    return updatedUser;
  }

  async deleteInvoice(
    userId: mongoose.Types.ObjectId,
    invoiceId: mongoose.Types.ObjectId,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const updatedInvoices = user.invoice.filter(
      (el) => el.toString() !== invoiceId.toString(),
    );
    return this.userModel.findByIdAndUpdate(
      userId,
      { invoice: updatedInvoices },
      { new: true },
    );
  }

  async deleteUser(userId) {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException();
    return this.userModel.findByIdAndDelete(userId);
  }
  async updateUser(userId, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException();
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
    });
  }
}
