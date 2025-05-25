import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./global.css";
import { Bg } from "../assets";
import { useFonts } from "expo-font";
import FormLogin from "../features/user/FormLogin";
export default function App() {
  const [fontsLoaded] = useFonts({
    FiraCode: require("./assets/fonts/FiraCode-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View>
      <Text className="text-red-600 font-firacode mb-5">
        Open up App.js to start working on your application ! === !==
      </Text>
      <FormLogin />
      <StatusBar style="auto" />
      <Bg width={244} height={255} />
    </View>
  );
}
