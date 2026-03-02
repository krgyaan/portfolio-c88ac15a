import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { SubPageHeader } from "./SubPageHeader";
import { Footer } from "./Footer";
import { BorderedContainer } from "@/components/ui/BorderedContainer";
import { useAnimeTheme } from "@/contexts/AnimeThemeContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { theme } = useAnimeTheme();
  const subPageTitles = theme.labels.subPageTitles;
  
  const isSubPage = Object.keys(subPageTitles).some(
    (path) => location.pathname === path || location.pathname.startsWith(path + "/")
  );
  
  const subPageTitle = subPageTitles[location.pathname] || 
    Object.entries(subPageTitles).find(([path]) => 
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
