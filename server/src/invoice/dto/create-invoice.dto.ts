import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class BillFrom {
  @IsNotEmpty()
  @IsString()
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class BillTo {
  @IsNotEmpty()
  @IsString()
  clientName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  clientEmail: string;

  @IsNotEmpty()
  @IsString()
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class Item {
  @IsNotEmpty()
  @IsString()
  itemName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  total: number;
}
export class CreateInvoiceDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BillFrom)
  billFrom: BillFrom;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BillTo)
  billTo: BillTo;

  @IsNotEmpty()
  @IsString()
  invoiceDate: string;

  @IsNotEmpty()
  @IsString()
  paymentTerms: string;

  @IsNotEmpty()
  @IsString()
  projectDescription: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Item)
  @ArrayNotEmpty()
  itemList: Item[];
}
