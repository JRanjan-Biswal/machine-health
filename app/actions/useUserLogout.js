import { useRouter } from "next/navigation";

const useUserLogout = () => {
    const router = useRouter();
    const logoutUser = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        router.push('/'); // Redirect to the home page
    };
    logoutUser();
    return null; // This hook does not return anything, it just performs the logout action
}

export default useUserLogout;