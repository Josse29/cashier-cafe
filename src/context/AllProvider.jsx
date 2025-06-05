import { createContext, useState } from "react";
export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const [test, setTest] = useState("test");
  return (
    <AllContext.Provider value={{ test, setTest }}>
      {children}
    </AllContext.Provider>
  );
};
