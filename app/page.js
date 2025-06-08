import LeftPanel from "@/components/LeftPanel";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2">
        <LeftPanel />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="flex items-center gap-2 px-4 py-2 min-w-[177px] h-[44px] absolute top-4 right-4">
          <Image
            src="/icon-use.png"
            alt="User icon"
            className="w-6 h-6"
            width={24}
            height={24}
          />
          <Link
            href="/#"
            className="text-[#2d3e5c] font-semibold text-base font-montserrat hover:text-[#1a2538] transition-colors"
          >
            Login to Admin
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

