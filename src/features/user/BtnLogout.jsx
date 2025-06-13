import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { removeStorage } from "../../utils/asyncStorage";
import { router } from "expo-router";

const BtnLogout = () => {
  const handleLogout = async () => {
    await removeStorage("auth");
    router.push("/");
  };
  return (
    <TouchableOpacity
      style={{
        borderTopWidth: 1,
        borderTopColor: "#DBD8D2",
        padding: 20,
      }}
      onPress={handleLogout}
    >
      <Text className="font-montserratbold text-red-400 text-xl">Logout</Text>
    </TouchableOpacity>
  );
};

export default BtnLogout;
