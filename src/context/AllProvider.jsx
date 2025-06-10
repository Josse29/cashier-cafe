import { createContext, useRef, useState } from "react";
export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  // product
  const [productSuccess, setProductSuccess] = useState("");
  const [cashSuccess, setCashSuccess] = useState("");
  const [cartSum, setCartSum] = useState(0);
  const paymentRef = useRef(null);
  return (
    <AllContext.Provider
      value={{
        cashSuccess,
        setCashSuccess,
        productSuccess,
        setProductSuccess,
        cartSum,
        setCartSum,
        paymentRef,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
