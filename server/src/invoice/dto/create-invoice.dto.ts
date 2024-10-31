import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'Bradford St 21',
  })
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'London',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '3700',
  })
  postCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'England',
  })
  country: string;
}

export class BillTo {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'David',
  })
  clientName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'Davit@gmail.com',
  })
  clientEmail: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'kapanadze st 15',
  })
  streetAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'London',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1000',
  })
  postCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Georgia',
  })
  country: string;
}

export class Item {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Banner Design',
  })
  itemName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: '2',
  })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 199.0,
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    example: 398,
  })
  total: number;
}
export class CreateInvoiceDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BillFrom)
  @ApiProperty({
    example: {
      streetAddress: 'vake',
      city: 'tbilisi',
      postCode: 3700,
      country: 'georgia',
    },
  })
  billFrom: BillFrom;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BillTo)
  @ApiProperty({
    example: {
      clientName: 'saba',
      clientEmail: 'saba@gmail.com',
      streetAddress: 'sain peter st 21',
      city: 'amsterdam',
      postCode: '3000',
      country: 'holand',
    },
  })
  billTo: BillTo;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '21 aug 2024',
  })
  invoiceDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '20 sep 2025',
  })
  paymentTerms: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Design',
  })
  projectDescription: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Item)
  @ArrayNotEmpty()
  @ApiProperty({
    example: [
      {
        itemName: 'sudoki',
        quantity: 4,
        price: 20,
        total: 2000,
      },
    ],
  })
  itemList: Item[];
}
