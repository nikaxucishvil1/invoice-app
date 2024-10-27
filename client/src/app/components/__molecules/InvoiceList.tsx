"use client";

interface invoiceList {
  invoices: Invoice[];
}
const InvoiceList = (props: invoiceList) => {
  const { invoices } = props;
  return (
    <div>
      <header>
        <div>
          <h1>Invoices</h1>
          <p>{invoices.length} invoices</p>
        </div>
        <div>
          <h1>Filter</h1>
          <button>New</button>
        </div>
      </header>
      {invoices.map((el) => (
        <div></div>
      ))}
    </div>
  );
};

export default InvoiceList;
