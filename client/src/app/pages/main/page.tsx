import EmptyInvoice from "@/app/components/__molecules/EmptyInvoice";
import InvoiceList from "@/app/components/__molecules/InvoiceList";
import MainHeader from "@/app/components/__molecules/MainHeader";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getToken = async (tokenValue: string) => {
  const cookieStore = cookies();
  const userToken = cookieStore.get(tokenValue);
  return userToken?.value;
};

const getData = async (token: string) => {
  try {
    const authString = `Bearer ${token}`;
    const res = await axios.get("http://localhost:3000/invoice", {
      headers: { Authorization: authString },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const Main = async () => {
  const token = (await getToken("userToken")) as string;
  if (!token) redirect("/");
  const invoices = await getData(token);
  if (!invoices) redirect("/");

  return (
    <div>
      <div>
        <MainHeader />
      </div>
      {invoices.length > 0 ? <InvoiceList invoices={invoices} /> : <EmptyInvoice />}
    </div>
  );
};

export default Main;
