import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BillFrom, BillTo, Item } from '../dto/create-invoice.dto';
import mongoose from 'mongoose';

@Schema()
export class Invoice {
  @Prop()
  billFrom: BillFrom;

  @Prop()
  billTo: BillTo;

  @Prop()
  invoiceDate: string;

  @Prop()
  paymentTerms: string;

  @Prop()
  projectDescription: string;

  @Prop()
  itemList: Item[];

  @Prop()
  createdBy: mongoose.Schema.Types.ObjectId;

  @Prop({ default: 'Pending' })
  status: string;
}
export const InvoiceShcema = SchemaFactory.createForClass(Invoice);
