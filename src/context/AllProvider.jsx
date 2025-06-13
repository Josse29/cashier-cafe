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
  // protected
  const pathname = usePathname();
  const protectedRoute = async () => {
    const user = await getStorage("auth");
    if (user) {
      const { token, key } = user;
      const user = JWT.decode(token, key);
      console.log(user);
    }
  };
  useEffect(() => {
    protectedRoute();
  }, [pathname]);
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
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
