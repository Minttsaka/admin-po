import type { Metadata } from "next";
import { GlobalNavBar } from "@/components/global-nav-bar";
import { SideBar } from "@/components/side-bar";

export const metadata: Metadata = {
  title: "poly-observer",
  description: "Generated by create next app",
  icons:'https://dct4life-files.s3.af-south-1.amazonaws.com/uploads/pologo.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-dot  bg-gray-100">
        <SideBar />
        <div className="h-screen overflow-y-auto w-full">
          <GlobalNavBar />
          {children}
        </div>
      </div> 
  );
}
