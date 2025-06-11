// import { Montserrat } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/layout";

// const montserratSans = Montserrat({
//   variable: "--font-monteserrat-sans",
//   subsets: ["latin"],
//   weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });


// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "kadant",
  description: "Kadant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
