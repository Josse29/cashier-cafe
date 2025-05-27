import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const FormLogin = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <View>
      <View className="bg-[#6c3227] px-5 py-3 rounded-md self-center">
        <Text className="text-3xl text-white tracking-widest text-center font-montserratextrabold">
          Login
        </Text>
      </View>
      <View className="bg-[#6c3227] p-6 rounded-lg w-[85%]">
        <View>
          <TextInput
            className="bg-white mb-4 px-3 tracking-widest rounded-md font-montserratextrabold"
            placeholder="Username :"
            aria-label="input"
          />
        </View>
        <View className="flex flex-row items-center mb-6 bg-white px-2 rounded-md  ">
          <View className="w-[90%]">
            <TextInput
              secureTextEntry={passwordVisible}
              className="tracking-widest rounded-md font-montserratextrabold"
              placeholder="Password :"
            />
          </View>
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Entypo
              name={passwordVisible ? "eye-with-line" : "eye"}
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="bg-[#d8ac28] py-2"
          onPress={() => router.push("/(drawer)/order")}
        >
          <Text className="text-center text-white text-2xl tracking-widest font-montserratextrabold">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormLogin;
