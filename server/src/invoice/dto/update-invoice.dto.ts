import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { BillFrom, BillTo, CreateInvoiceDto, Item } from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @ApiPropertyOptional({
    example: {
      streetAddress: 'vake',
      city: 'tbilisi',
      postCode: 3700,
      country: 'georgia',
    },
  })
  billFrom?: BillFrom;

  @ApiPropertyOptional({
    example: {
      clientName: 'saba',
      clientEmail: 'saba@gmail.com',
      streetAddress: 'sain peter st 21',
      city: 'amsterdam',
      postCode: '3000',
      country: 'holand',
    },
  })
  billTo?: BillTo;

  @ApiPropertyOptional({ example: '21 aug 2024' })
  invoiceDate?: string;

  @ApiPropertyOptional({ example: '20 sep 2025' })
  paymentTerms?: string;

  @ApiPropertyOptional({ example: 'Design' })
  projectDescription?: string;

  @ApiPropertyOptional({
    example: [
      {
        itemName: 'sudoki',
        quantity: 4,
        price: 20,
        total: 2000,
      },
    ],
  })
  itemList?: Item[];
}
