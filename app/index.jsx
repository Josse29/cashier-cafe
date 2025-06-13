import React, { useContext, useEffect, useState } from "react";
import { View, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { Bg, Logo } from "../src/assets";
import { FormLogin } from "../src/features/user";
const { width, height } = Dimensions.get("window");
import "./../global.css";
import { productSchema } from "../src/services/product";
import { cashSchema } from "../src/services/cash";
import { userSchema } from "../src/services/user";
import { KeyboardAvoidingComponent } from "../src/components";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dbInit = async () => {
    setLoading(true);
    try {
      await userSchema();
      await productSchema();
      await cashSchema();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dbInit();
  }, []);
  return (
    <View className="bg-[#ECDEBB] flex-1">
      <Bg width={width} height="100%" preserveAspectRatio="none" />
      <View className="absolute top-0 right-0 bottom-0 left-0">
        <KeyboardAvoidingComponent>
          <View className="flex flex-1 items-center justify-center">
            <View className="bg-[#964a3b] p-3 w-[110px] h-[110px] rounded-lg flex items-center justify-center ps-[15px] mb-6">
              <Logo />
            </View>
            <FormLogin loading={loading} setLoading={setLoading} />
          </View>
        </KeyboardAvoidingComponent>
      </View>
    </View>
  );
};

export default Login;
