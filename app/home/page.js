import React from "react";
import BusinessSnapshot from "@/components/Home/BusinessSnapshot";
import MainImageSection from "@/components/Home/MainImageSection";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";


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


const page = async() => {
  const { userData, clientData } = await getData();

  return (
    <div className="flex flex-col w-full container mt-[20px]">

      {/* Main Content Section */}
      <div className="flex flex-grow flex-row gap-3">
        {/* Main Image and Welcome Section */}
        <div className="flex-grow shadow-custom-1 rounded-lg bg-white overflow-hidden h-[calc(100vh-130px)]">
          <MainImageSection 
            userName={userData?.name?.split(' ')?.[0]} 
            clientData={clientData}
          />
        </div>

        {/* Business Snapshot Section */}
        <aside className="flex-none w-1/4 rounded-lg overflow-hidden">
          <BusinessSnapshot clientData={clientData} />
        </aside>
      </div>
    </div>
  );
};

export default page;
