import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
}
