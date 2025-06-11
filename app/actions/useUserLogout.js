import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useUserLogout = () => {
    const router = useRouter();
    const logoutUser = useCallback(async () => {
        await fetch("/api/logout"); // Clear the token from local storage
        router.push('/'); // Redirect to the home page
    }, []);
    
    return {
        logoutUser
    }; // This hook does not return anything, it just performs the logout action
}

export default useUserLogout;