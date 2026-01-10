import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BorderedContainer } from "@/components/ui/BorderedContainer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col">
        <BorderedContainer className="flex-1 flex flex-col">
          <Navbar />
          <main key={location.pathname} className="flex-1 page-transition py-8">
            {children}
          </main>
          <Footer />
        </BorderedContainer>
      </div>
    </div>
  );
}
