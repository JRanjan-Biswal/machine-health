import DashBoard from "@/components/Dashboard/DashBoard";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const getData = async () => {
  try {
    const cookieStore = await cookies();
    const currentcookie = cookieStore.get('token').value.trim();

    // reutrn machinery information
    const response = await fetch(`${process.env.API_URL}/client`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${currentcookie}`
      }
    });

    if (!response.ok) {
      throw notFound();
    }

    const result = await response.json();

    return {clientData : result?.clients};

  } catch (error) {
    throw notFound();
  }
}

const page = async () => {
  const data = await getData();
  const userData = data?.userData;
  const clientData = data?.clientData;

  return <DashBoard clientData={clientData} userData={userData} />
};

export default page;

