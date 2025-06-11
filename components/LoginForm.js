'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TbEyeClosed } from "react-icons/tb";
import { PiEye } from "react-icons/pi";
// import { toast, ToastContainer } from 'react-toastify';
import { toast } from "sonner"

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const LoginForm = ({ defaultClientId = '', defaultPassword = '' }) => {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: defaultClientId,
    password: defaultPassword
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields', { color: '#1d1d1d' });
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert('Invalid email format');
      toast.error('Invalid email format');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      setIsLoading(true);
      if (response.ok) {
        toast.success('Login successful!', { color: '#1d1d1d' });
        router.push('/dashboard');
        return;
      }
      else {
        throw Error();
      }
    }
    catch (error) {
      toast.error('Login failed. Please check your credentials.', { color: '#1d1d1d' });
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full max-w-[443px] min-w-[320px] flex flex-col gap-[50px] p-4">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[32px] font-bold font-montserrat text-[#1d1d1d]">
            Client Portal
          </h1>
          <p className="text-base font-normal font-montserrat text-[#1d1d1d]">
            Log in to view assigned cases
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[35px]" autoComplete="off">
          <div className="flex flex-col gap-5">
            <div className="relative">
              <input type="text" name="email" placeholder="email"
                value={formData.email} onChange={handleInputChange}
                className="w-full px-5 py-[15px] border border-[#96a5ba] rounded-[6px] text-base font-montserrat text-[#2d3e5c] focus:outline-none focus:border-[#1d1d1d]"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-5 py-[15px] border border-[#96a5ba] rounded-[6px] text-base font-montserrat text-[#2d3e5c] focus:outline-none focus:border-[#1d1d1d]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[14px] top-1/2 transform -translate-y-1/2"
              >
                {
                  showPassword ? <PiEye className="text-[#1d1d1d] w-6 h-6" /> : <TbEyeClosed className="text-[#1d1d1d] w-6 h-6" />
                }
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center cursor-pointer w-full py-[15px] px-[50px] bg-[#1d1d1d] text-white rounded-[6px] font-bold text-base font-montserrat hover:bg-[#2d2d2d] transition-colors"
          >
            {
              isLoading ? <div className="loader"></div> : 'Log In'
            }
          </button>
        </form>
      </div>
      {/* <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar /> */}
    </>
  );
};

export default LoginForm;

