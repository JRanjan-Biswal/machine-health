import React from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Home from "@/components/Home/Home";


const getData = async () => {
  try {
    const cookieStore = await cookies();
    const currentcookie = cookieStore.get('token').value.trim();
    const loggedInUserEmail = cookieStore.get('email').value.trim();

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

    const allUserResponse = await fetch(`${process.env.API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${currentcookie}`
      }
    });

    if (!allUserResponse.ok) {
      throw notFound();
    }

    const result = await response.json();
    const allUserResult = await allUserResponse.json();
    const allUserResultData = allUserResult?.users;

    const loggedInUser = allUserResultData?.filter(user => user.email == loggedInUserEmail);

    return { userData: loggedInUser?.[0], clientData: result?.clients };

  } catch (error) {
    throw notFound();
  }
}


const page = async () => {
  const { userData, clientData } = await getData();

  return (
    <Home userData={userData} clientData={clientData} />
  );
};

export default page;
