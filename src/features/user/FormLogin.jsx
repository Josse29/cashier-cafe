import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AllContext } from "../../context/AllProvider";

const FormLogin = (props) => {
  const { loading, setLoading } = useContext(AllContext);
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
        {/* username */}
        <View>
          <TextInput
            className="font-montserratextrabold bg-white mb-4 px-3 tracking-widest rounded-md"
            placeholder="Username :"
          />
        </View>
        {/* password */}
        <View className="flex flex-row justify-between items-center mb-6 bg-white px-3 rounded-md">
          <TextInput
            secureTextEntry={passwordVisible}
            className="font-montserratextrabold tracking-widest w-[90%]"
            placeholder="Password :"
          />
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
        {/* button */}
        <TouchableOpacity
          className={`bg-[#d8ac28] py-3 ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onPress={() => router.push("/(drawer)/order")}
          disabled={loading}
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
