import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop([
    {
      type: mongoose.Types.ObjectId,
      ref: 'invoice',
    },
  ])
  invoice: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
