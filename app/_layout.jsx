import React from "react";
import { AllProvider } from "../src/client/context/AllProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./../src/client/assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./../src/client/assets/fonts/Montserrat-Bold.ttf"),
    MontserratExtraBold: require("./../src/client/assets/fonts/Montserrat-ExtraBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <AllProvider>
      <Stack
        screenOptions={{
          // presentation: "modal",
          headerTitleStyle: {
            fontFamily: "MontserratBold",
          },
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#964a3b",
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="(modal)" />
      </Stack>
    </AllProvider>
  );
};

export default RootLayout;
