import JWT from "expo-jwt";
import { router, usePathname, useRouter } from "expo-router";
import { createContext, useEffect, useRef, useState } from "react";
export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const [productSuccess, setProductSuccess] = useState("");
  const [cashSuccess, setCashSuccess] = useState("");
  const [cartSum, setCartSum] = useState({ qty: 0, price: 0 });
  const [orderSuccess, setOrderSuccess] = useState("");
  const paymentRef = useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const orderRef = useRef(null);
  const financialRef = useRef(null);
  const [userSuccess, setUserSuccess] = useState("");
  const [reqUser, setReqUser] = useState({
    userId: 0,
    userName: "",
    userFullname: "",
    userEmail: "",
    img: "",
    userInfo: "",
  });
  // protected
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
        financialRef,
        orderRef,
        userSuccess,
        setUserSuccess,
        reqUser,
        setReqUser,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
