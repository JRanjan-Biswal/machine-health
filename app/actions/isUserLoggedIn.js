import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useUserLogedIn = () => {
    const [userloggedid, setuserloggedid] = useState(false);
    const router = useRouter();

    const checkUserIsLoggedIn = () => {
        let userToken = localStorage.getItem('token');
        if (!userToken) {
            router.push('/');
        }
        else {
            setuserloggedid(true);
        }
    }

    useEffect(() => {
        checkUserIsLoggedIn();
    }, [router]);

    return userloggedid;
}

export default useUserLogedIn;