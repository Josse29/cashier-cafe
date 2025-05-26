import { View, Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

const Txt = ({ title = "Title" }) => {
  const [fontsLoaded] = useFonts({
    firacode: require("./../assets/fonts/FiraCode-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Text className="font-firacode">{title} ==== !==</Text>
      <Text className="">{title} ==== !==</Text>
    </>
  );
};

export default Txt;
