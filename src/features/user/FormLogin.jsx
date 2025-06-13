import React, { useContext, useEffect, useState } from "react";
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
import Alerts from "../../components/Alerts";
import { loginAPI } from "../../services/user";
import JWT from "expo-jwt";
import { getStorage, saveStorage } from "../../utils";

const FormLogin = (props) => {
  const { loading, setLoading } = props;
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [req, setReq] = useState({
    userName: "",
    userPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleChange = (field, txt) => {
    setReq((prev) => ({
      ...prev,
      [field]: txt,
    }));
  };
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { token, key } = await loginAPI(req);
      await saveStorage("auth", { token, key });
      const user = await getStorage("auth");
      const auth = JWT.decode(user.token, user.key);
      if (auth) {
        router.push("/(drawer)/order");
      }
    } catch (error) {
      setErrMsg(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <View className="bg-[#6c3227] px-5 py-3 rounded-md self-center">
        <Text className="text-3xl text-white tracking-widest text-center font-montserratextrabold">
          Login
        </Text>
      </View>
      <View className="bg-[#6c3227] p-6 rounded-lg w-[85%]">
        {/* alert */}
        <Alerts status="error" msg={errMsg} setMsg={setErrMsg} />
        {/* username */}
        <View>
          <TextInput
            className="font-montserratextrabold bg-white mb-4 px-3 tracking-widest rounded-md"
            placeholder="Username :"
            onChangeText={(txt) => handleChange("userName", txt)}
            value={req.userName}
          />
        </View>
        {/* password */}
        <View className="flex flex-row justify-between items-center mb-6 bg-white px-3 rounded-md">
          <TextInput
            secureTextEntry={passwordVisible ? false : true}
            className="font-montserratextrabold tracking-widest w-[90%]"
            placeholder="Password :"
            onChangeText={(txt) => handleChange("userPassword", txt)}
            value={req.userPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Entypo
              name={passwordVisible ? "eye" : "eye-with-line"}
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
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-center text-white text-2xl tracking-widest font-montserratextrabold">
            {loading ? "loading...." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormLogin;
