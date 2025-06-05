import React, { useContext, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { Bg, Logo } from "../src/assets";
import { FormLogin } from "../src/features/user";
const { width, height } = Dimensions.get("window");
import "./../global.css";
import { AllContext } from "../src/context/AllProvider";

const Login = () => {
  return (
    <View className="bg-[#ECDEBB] h-full w-screen">
      <Bg width={width} height="100%" preserveAspectRatio="none" />
      <View className="absolute top-0 right-0 bottom-0 left-0">
        <View className="flex h-full items-center justify-center">
          <View className="bg-[#964a3b] p-3 w-[110px] h-[110px] rounded-lg flex items-center justify-center ps-[15px] mb-6">
            <Logo />
          </View>
          <FormLogin />
        </View>
      </View>
    </View>
  );
};

export default Login;
