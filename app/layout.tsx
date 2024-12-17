import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '../components/Navbar'
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
