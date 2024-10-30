import axios from "axios";
import { getToken } from "../main/page";
import { redirect } from "next/navigation";
import MainHeader from "@/app/components/__molecules/MainHeader";

const getInvoice = async (token: string, id: string) => {
  try {
    const authString = `Bearer ${token}`;
    const res = await axios.get(`http://localhost:3000/invoice/${id}`, {
      headers: { Authorization: authString },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Single = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const id = searchParams.id as string;
  if (!id) redirect("/");
  const token = await getToken("userToken");
  if (!token) redirect("/");
  const invoice: Invoice = await getInvoice(token, id);

  return (
    <div className=" bg-[#F8F8FB]">
      <div>
        <MainHeader />
      </div>
      <div className="flex flex-col p-4 gap-10">
        <header className="w-full">
          <h1 className="text-[#0C0E16] text-[15px] font-bold">Go back</h1>
        </header>
        <div className="flex items-center justify-between w-full p-4 bg-[#FFFF] rounded-md">
          <h1>Status</h1>
          <div
            style={{
              backgroundColor:
                invoice.status === "Pending" ? "#FF8F000F" : "#33D69F0F",
              color: invoice.status === "Pending" ? "#FF8F00" : "#33D69F",
            }}
            className="p-4 rounded-xl"
          >
            <h1>{invoice.status}</h1>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full gap-10 p-4 bg-[#FFFF] rounded-md">
          <div>
            <h1 className="text-[#0C0E16] text-[15px] font-bold">
              #{invoice._id.slice(6, 12)}
            </h1>
            <h1 className="text-[#7E88C3] text-[15px] font-[500]">
              {invoice.projectDescription}
            </h1>
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-[#7E88C3] text-[15px] font-[500]">
              {invoice.billFrom.streetAddress}
            </h1>
            <h1 className="text-[#7E88C3] text-[15px] font-[500]">
              {invoice.billFrom.city}
            </h1>
            <h1 className="text-[#7E88C3] text-[15px] font-[500]">
              {invoice.billFrom.postCode}
            </h1>
            <h1 className="text-[#7E88C3] text-[15px] font-[500]">
              {invoice.billFrom.country}
            </h1>
          </div>
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col items-start justify-center gap-5">
              <div>
                <p className="text-[#7E88C3] text-[15px] font-[500]">
                  Invoice date
                </p>
                <h1 className="text-[#0C0E16] text-[15px] font-bold">
                  {invoice.invoiceDate}
                </h1>
              </div>
              <div>
                <p className="text-[#7E88C3] text-[15px] font-[500]">
                  Payment due
                </p>
                <h1 className="text-[#0C0E16] text-[15px] font-bold">
                  {invoice.paymentTerms}
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <h1 className="text-[#7E88C3] text-[15px] font-[500]">Bill to</h1>
              <h1 className="text-[#0C0E16] text-[15px] font-bold">
                {invoice.billTo.clientName}
              </h1>
              <h1 className="text-[#7E88C3] text-[15px] font-[500]">
                {invoice.billTo.streetAddress}
              </h1>
              <h1 className="text-[#7E88C3] text-[15px] font-[500]">
                {invoice.billTo.city}
              </h1>
              <h1 className="text-[#7E88C3] text-[15px] font-[500]">
                {invoice.billTo.postCode}
              </h1>
              <h1 className="text-[#7E88C3] text-[15px] font-[500]">
                {invoice.billTo.country}
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-[#7E88C3] text-[15px] font-[500]">sent to</h1>
            <h1 className="text-[#0C0E16] text-[15px] font-bold">
              {invoice.billTo.clientEmail}
            </h1>
          </div>
          <div className="bg-[#F9FAFE] w-full rounded-t-xl">
            {invoice.itemList.map((item) => (
              <div className="w-full flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-between p-5">
                  <div className="flex items-start justify-start flex-col">
                    <h1 className="text-[#0C0E16] text-[15px] font-bold">
                      {item.itemName}
                    </h1>
                    <h1 className="text-[#7E88C3] text-[15px] font-[500]">
                      {item.quantity} x ${item.price}
                    </h1>
                  </div>
                  <h1 className="text-[#0C0E16] text-[15px] font-bold">
                    $ {item.total}
                  </h1>
                </div>
                <div className="p-5 bg-[#373B53] w-full flex items-center justify-between rounded-b-xl">
                  <h1 className="text-[#FFFFFF] font-[500] text-[15px]">Grand total </h1>
                  <h1 className="text-[#FFFFFF] text-[24px] font-[700]">
                    $
                    {invoice.itemList.reduce(
                      (acc, curr) => acc + curr.total,
                      0
                    )}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
