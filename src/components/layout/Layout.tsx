import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SubPageHeader } from "./SubPageHeader";
import { Footer } from "./Footer";
import { BorderedContainer } from "@/components/ui/BorderedContainer";

interface LayoutProps {
  children: ReactNode;
}

const SUB_PAGE_TITLES: Record<string, string> = {
  "/experiences": "Voyage Log",
  "/projects": "Treasure Map",
  "/blog": "Captain's Log",
};

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  const isSubPage = Object.keys(SUB_PAGE_TITLES).some(
    (path) => location.pathname === path || location.pathname.startsWith(path + "/")
  );
  
  const subPageTitle = SUB_PAGE_TITLES[location.pathname] || 
    Object.entries(SUB_PAGE_TITLES).find(([path]) => 
      location.pathname.startsWith(path + "/")
    )?.[1];

  return (
    <div className="flex min-h-screen flex-col relative">
      <div className="flex-1 flex flex-col pt-8">
        <BorderedContainer className="flex-1 flex flex-col">
          {isSubPage && subPageTitle ? (
            <SubPageHeader title={subPageTitle} />
          ) : (
            <Navbar />
          )}
          <main key={location.pathname} className="flex-1 page-transition py-8">
            {children}
          </main>
          <Footer />
        </BorderedContainer>
      </div>
    </div>
  );
}
