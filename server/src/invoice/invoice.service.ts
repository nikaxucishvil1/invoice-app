import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './schema/invoice.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    private usersService: UsersService,
  ) {}

  async create(req, createInvoiceDto: CreateInvoiceDto) {
    if (!req.userId) throw new BadRequestException('no user ID provided');
    const newInvoiceData = { ...createInvoiceDto, createdBy: req.userId };
    const newInvoice = await this.invoiceModel.create(newInvoiceData);
    await this.usersService.addInvoice(req.userId, newInvoice._id);
    return newInvoice;
  }

  findAll(req) {
    const userId = req.userId;
    return this.invoiceModel.find({ createdBy: userId }).select('-createdBy');
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const invoice = await this.invoiceModel.findById(id);
    if (!invoice) throw new NotFoundException();
    return invoice;
  }

  update(id, updateInvoiceDto: UpdateInvoiceDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const invoice = this.findOne(id);
    if (!invoice) throw new NotFoundException('Invoice not found');
    return this.invoiceModel.findByIdAndUpdate(id, updateInvoiceDto, {
      new: true,
    });
  }

  async remove(id, req) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const invoice = await this.invoiceModel.findByIdAndDelete(id);
    if (!invoice) throw new NotFoundException();
    const user = await this.usersService.findOne(req.userId);
    if (!user) throw new NotFoundException();
    await this.usersService.deleteInvoice(user._id, id);
    return { invoice: invoice, message: 'deleted' };
  }
}
