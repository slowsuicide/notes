import React, { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";

interface IPageVersion {
  version: string;
  window: string;
  toggle?: (name: string) => void;
}


const pageVersionContext = React.createContext<any>(null);

export const usePageVersionContext = () => {
  return useContext(pageVersionContext);
};


export const VersionProvider = ({ children }: any) => {
  const isMobile: boolean = useMediaQuery({ query: "(max-width: 685px)" });

  const [pageInfo, setPageInfo] = useState<IPageVersion>({
    version: isMobile ? "mobile" : "desktop",
    window: "main",
  });
  
  const toggle = (window: string): void => {
    setPageInfo({ version: isMobile ? "mobile" : "desktop", window: window });
  };


  console.log(usePageVersionContext())

  return (
    <pageVersionContext.Provider value={{ ...pageInfo, toggle }}>
      {children}
    </pageVersionContext.Provider>
  );
};
