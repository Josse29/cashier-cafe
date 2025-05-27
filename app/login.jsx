import { View, Text, Dimensions } from "react-native";
import React, { useContext } from "react";
import { Bg, Logo } from "../src/client/assets";
import { FormLogin } from "../src/client/features/user";
import { AllContext } from "../src/client/context/AllProvider";
const { width, height } = Dimensions.get("window");
import "./../global.css";
const Login = () => {
  const { test } = useContext(AllContext);
  return (
    <View className="bg-[#ECDEBB] h-screen w-screen">
      <Bg width={width} height={height} preserveAspectRatio="none" />
      <View className="absolute top-0 right-0 bottom-0 left-0">
        <View className="flex h-full items-center justify-center">
          <View className="bg-[#964a3b] p-3 w-[110px] h-[110px] rounded-lg flex items-center justify-center ps-[15px] mb-6">
            <Logo />
          </View>
          <Text>{test}</Text>
          <FormLogin />
        </View>
      </View>
    </View>
  );
};

export default Login;
