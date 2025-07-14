import React from "react";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  // Debug logging
  console.log("Layout: isMobile =", isMobile, "window.innerWidth =", typeof window !== "undefined" ? window.innerWidth : "undefined");

  return (
    <div className="flex flex-col min-h-screen">
      {isMobile ? <MobileHeader /> : <Header />}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
