import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

const FormLogin = () => {
  return (
    <View>
      {/* <Text>FormLogin</Text> */}
      <Pressable onPress={() => router.push("/profile")}>
        <Text>Go To Profile</Text>
      </Pressable>
    </View>
  );
};

export default FormLogin;
