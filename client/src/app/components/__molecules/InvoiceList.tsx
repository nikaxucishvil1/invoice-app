"use client";
import { FaPlus } from "react-icons/fa6";
import InvoiceListItem from "../__atoms/InvoiceListItem";

interface invoiceList {
  invoices: Invoice[];
}

const InvoiceList = (props: invoiceList) => {
  const { invoices } = props;
  return (
    <div className="bg-[#F8F8FB] min-h-screen">
      <header className="flex p-4 items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-[24px] text-[#0C0E16] font-bold">Invoices</h1>
          <p className="text-[#888EB0] text-[13px] font-[500]">
            {invoices.length} invoices
          </p>
        </div>
        <div className="flex items-center gap-5">
          <h1 className="text-[15px] font-bold text-[#0C0E16]">Filter</h1>
          <button className="rounded-[24px] bg-[#7C5DFA] flex items-center justify-center gap-4 p-2 pr-4">
            <div className="bg-[#FFFF] p-2 rounded-full">
              <FaPlus color="#7C5DFA" />
            </div>
            <p className="text-[#FFFFFF] font-bold text-[15px]">New</p>
          </button>
        </div>
      </header>
      <div className="p-7 flex items-center justify-center flex-col gap-5">
        {invoices.map((el) => (
          <InvoiceListItem invoice={el} />
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;
