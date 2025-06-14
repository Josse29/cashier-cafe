import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerItemList } from "@react-navigation/drawer";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FontAwesome6 } from "@expo/vector-icons";
import { BtnLogout, ImgUser } from "../../src/features/user";

function customerDrawerContent(props) {
  return (
    <View>
      <ImgUser />
      <View className="p-3">
        <DrawerItemList {...props} />
      </View>
      <BtnLogout />
    </View>
  );
}
const DrawerLayout = () => {
  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={customerDrawerContent}
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "MontserratBold",
          },
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#964a3b",
          },
          drawerHideStatusBarOnOpen: false,
          drawerActiveBackgroundColor: "#ECDEBB",
          drawerActiveTintColor: "#856c3e",
          drawerLabelStyle: {
            fontFamily: "MontserratBold",
          },
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="order"
          options={{
            drawerLabel: "Order",
            title: "Order",
            drawerIcon: ({ size, color }) => (
              <Entypo name="shopping-cart" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="product"
          options={{
            drawerLabel: "Product",
            title: "Product",
            drawerIcon: ({ size, color }) => (
              <Entypo name="book" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="financial"
          options={{
            drawerLabel: "Financial",
            title: "Financial",
            drawerIcon: ({ size, color }) => (
              <Entypo name="wallet" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ size, color }) => (
              <FontAwesome6 name="house-user" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};
export default DrawerLayout;
