"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Providers>
        <body className={inter.className}>
          <ToastContainer>
          <div className="h-screen bg-[#131314]">
          {/* <img src="https://nextui.pro/images/default-gradient.png" alt="" className="absolute h-screen w-screen mt-[-20vh]"/> */}
          {children}
            </div>
            </ToastContainer>
        </body>
        </Providers>
    </html>
  );
}
