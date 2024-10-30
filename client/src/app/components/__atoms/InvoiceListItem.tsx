import { useRouter } from "next/navigation";

interface InvoiceListItemIF {
  invoice: Invoice;
}
const InvoiceListItem = (props: InvoiceListItemIF) => {
  const { invoice } = props;
  const router = useRouter();

  return (
    <button
      className="w-full bg-[#FFFF] p-4 flex rounded-lg flex-col gap-4 justify-center"
      onClick={() => router.push(`./Single?id=${invoice._id}`)}
    >
      <header className="flex items-center justify-between w-full">
        <h1 className="text-[#0C0E16] text-[15px] font-bold">
          #{invoice._id.slice(6, 12)}
        </h1>
        <h1 className="text-[#858BB2] text-[13px] font-[500]">
          {invoice.billTo.clientName}
        </h1>
      </header>
      <footer className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-[13px] text-[#888EB0] font-[500]">
            {invoice.invoiceDate}
          </h1>
          <p className="text-[#0C0E16] text-[15px] font-bold">
            $ {invoice.itemList.reduce((acc, curr) => acc + curr.total, 0)}
          </p>
        </div>
        <div
          style={{
            backgroundColor:
              invoice.status === "Pending" ? "#FF8F000F" : "#33D69F0F",
            color: invoice.status === "Pending" ? "#FF8F00" : "#33D69F",
          }}
          className="rounded-md p-4 text-[15px] font-bold"
        >
          <p> {invoice.status}</p>
        </div>
      </footer>
    </button>
  );
};

export default InvoiceListItem;
