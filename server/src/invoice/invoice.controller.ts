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
  Query,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { QueryParamsDto } from './dto/query-params.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'Successfully created a new invoice.',
    example: {
      _id: '67234c6f21f22aad9429a2b5',
      billFrom: {
        streetAddress: 'vake',
        city: 'tbilisi',
        postCode: '3700',
        country: 'georgia',
      },
      billTo: {
        clientName: 'saba',
        clientEmail: 'saba@gmail.com',
        streetAddress: '21 disctrict',
        city: 'amsterdam',
        postCode: '492342',
        country: 'holand',
      },
      invoiceDate: '21August',
      paymentTerms: 'testTerm',
      projectDescription: 'simple Project',
      itemList: [
        {
          itemName: 'sudoki',
          quantity: 4,
          price: 20,
          total: 2000,
        },
        {
          itemName: 'testItem',
          quantity: 4,
          price: 20,
          total: 1999,
        },
      ],
      createdBy: '671cd82caa1fdc84ea743e3e',
      status: 'Pending',
      __v: 0,
    },
  })
  @ApiBadRequestResponse({
    description: 'No user ID provided or invalid input.',
  })
  create(@Req() req, @Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(req, createInvoiceDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Successfully retrieved the list of invoices.',
    example: [
      {
        _id: '67234c6f21f22aad9429a2b5',
        billFrom: {
          streetAddress: 'vake',
          city: 'tbilisi',
          postCode: '3700',
          country: 'georgia',
        },
        billTo: {
          clientName: 'saba',
          clientEmail: 'saba@gmail.com',
          streetAddress: '21 disctrict',
          city: 'amsterdam',
          postCode: '492342',
          country: 'holand',
        },
        invoiceDate: '21August',
        paymentTerms: 'testTerm',
        projectDescription: 'simple Project',
        itemList: [
          {
            itemName: 'sudoki',
            quantity: 4,
            price: 20,
            total: 2000,
          },
          {
            itemName: 'testItem',
            quantity: 4,
            price: 20,
            total: 1999,
          },
        ],
        createdBy: '671cd82caa1fdc84ea743e3e',
        status: 'Pending',
        __v: 0,
      },
    ],
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters provided.',
  })
  findAll(@Req() req, @Query() queryParams: QueryParamsDto) {
    return this.invoiceService.findAll(req, queryParams);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the invoice' })
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Successfully retrieved the invoice.',
    example: {
      _id: '67234c6f21f22aad9429a2b5',
      billFrom: {
        streetAddress: 'vake',
        city: 'tbilisi',
        postCode: '3700',
        country: 'georgia',
      },
      billTo: {
        clientName: 'saba',
        clientEmail: 'saba@gmail.com',
        streetAddress: '21 disctrict',
        city: 'amsterdam',
        postCode: '492342',
        country: 'holand',
      },
      invoiceDate: '21August',
      paymentTerms: 'testTerm',
      projectDescription: 'simple Project',
      itemList: [
        {
          itemName: 'sudoki',
          quantity: 4,
          price: 20,
          total: 2000,
        },
        {
          itemName: 'testItem',
          quantity: 4,
          price: 20,
          total: 1999,
        },
      ],
      createdBy: '671cd82caa1fdc84ea743e3e',
      status: 'Pending',
      __v: 0,
    },
  })
  @ApiNotFoundResponse({
    description: 'Invoice not found or invalid ID format.',
  })
  findOne(@Param('id') id) {
    return this.invoiceService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the invoice' })
  @ApiOkResponse({
    description: 'Successfully updated the invoice.',
    example: {
      _id: '67234c6f21f22aad9429a2b5',
      billFrom: {
        streetAddress: 'vake',
        city: 'tbilisi',
        postCode: '3700',
        country: 'georgia',
      },
      billTo: {
        clientName: 'saba',
        clientEmail: 'saba@gmail.com',
        streetAddress: '21 disctrict',
        city: 'amsterdam',
        postCode: '492342',
        country: 'holand',
      },
      invoiceDate: '21August',
      paymentTerms: 'testTerm',
      projectDescription: 'simple Project',
      itemList: [
        {
          itemName: 'sudoki',
          quantity: 4,
          price: 20,
          total: 2000,
        },
        {
          itemName: 'testItem',
          quantity: 4,
          price: 20,
          total: 1999,
        },
      ],
      createdBy: '671cd82caa1fdc84ea743e3e',
      status: 'Pending',
      __v: 0,
    },
  })
  @ApiNotFoundResponse({
    description: 'Invoice not found or invalid ID format.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input provided.',
  })
  update(@Param('id') id, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', required: true, description: 'ID of the invoice' })
  @ApiOkResponse({
    description: 'Successfully deleted the invoice.',
    schema: {
      example: {
        invoice: {
          _id: '67234c6f21f22aad9429a2b5',
          billFrom: {
            streetAddress: 'vake',
            city: 'tbilisi',
            postCode: '3700',
            country: 'georgia',
          },
          billTo: {
            clientName: 'saba',
            clientEmail: 'saba@gmail.com',
            streetAddress: '21 disctrict',
            city: 'amsterdam',
            postCode: '492342',
            country: 'holand',
          },
          invoiceDate: '21August',
          paymentTerms: 'testTerm',
          projectDescription: 'simple Project',
          itemList: [
            {
              itemName: 'sudoki',
              quantity: 4,
              price: 20,
              total: 2000,
            },
            {
              itemName: 'testItem',
              quantity: 4,
              price: 20,
              total: 1999,
            },
          ],
          createdBy: '671cd82caa1fdc84ea743e3e',
          status: 'Pending',
          __v: 0,
        },
        message: 'deleted',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Invoice not found or invalid ID format.',
  })
  remove(@Param('id') id, @Req() req) {
    return this.invoiceService.remove(id, req);
  }
}
