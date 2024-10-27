interface Address {
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
}

interface Item {
  itemName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  billFrom: Address;
  billTo: {
    clientName: string;
    clientEmail: string;
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  invoiceDate: string;
  paymentTerms: string;
  projectDescription: string;
  itemList: Item[];
  createdBy: string;
  status: string;
  _id: string;
  __v: number;
}
