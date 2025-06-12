import { createContext, useRef, useState } from "react";
export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  // product
  const [productSuccess, setProductSuccess] = useState("");
  const [cashSuccess, setCashSuccess] = useState("");
  const [cartSum, setCartSum] = useState({ qty: 0, price: 0 });
  const [orderSuccess, setOrderSuccess] = useState("");
  const paymentRef = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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
        isKeyboardVisible,
        setKeyboardVisible,
        orderSuccess,
        setOrderSuccess,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
