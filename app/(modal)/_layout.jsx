import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerTitleStyle: {
          fontFamily: "MontserratBold",
        },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#964a3b",
        },
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="payment"
        options={{
          headerTitle: "Payment",
        }}
      />
      <Stack.Screen
        name="createproduct"
        options={{
          headerTitle: "Create Product",
        }}
      />
      <Stack.Screen
        name="updateproduct"
        options={{
          headerTitle: "Update Product",
        }}
      />
      <Stack.Screen
        name="deleteproduct"
        options={{
          headerTitle: "Delete Product",
        }}
      />
      <Stack.Screen
        name="detailproduct"
        options={{
          headerTitle: "Detail Product",
        }}
      />
      <Stack.Screen
        name="createcashin"
        options={{
          headerTitle: "Cash In",
        }}
      />
      <Stack.Screen
        name="createcashout"
        options={{
          headerTitle: "Cash Out",
        }}
      />
    </Stack>
  );
};

export default Layout;
