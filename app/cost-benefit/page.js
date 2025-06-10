import Costcompt from "@/components/CostBenefit/Costcompt";
import { cookies } from 'next/headers';
import { notFound } from "next/navigation";

const getData = async () => {
    try {
        const cookieStore = await cookies();
        const currentcookie = cookieStore.get('token').value.trim();

        const response = await fetch(`${process.env.API_URL}/machines/684362214978c14755e02860/spare-parts/68436859af3221a4b1df84f1`, {
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${currentcookie}`
            }
        });

        if (!response.ok) {
            throw notFound();
        }

        const result = await response.json();
        const filterRotorData = result.filter(item => item.name == 'Rotor')?.[0]; // rotor
        return filterRotorData;
        // TODO: Add your logic to handle the data, e.g., save to database

    } catch (error) {
        throw notFound();
    }
}

const page = async() => {

    const data = await getData();

    return <Costcompt data={data} />
}

export default page;