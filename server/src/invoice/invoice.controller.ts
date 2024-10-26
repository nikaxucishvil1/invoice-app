import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(req, createInvoiceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req) {
    return this.invoiceService.findAll(req);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id) {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id, @Req() req) {
    return this.invoiceService.remove(id,req);
  }
}
