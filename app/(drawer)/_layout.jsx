import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Entypo from "@expo/vector-icons/Entypo";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { Josse } from "../assets";

function customerDrawerContent(props) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#964a3b", paddingTop: top }}
      >
        {/* <View>
          <Image
            source={Josse}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View> */}
        <DrawerItemList {...props} />
        {/* <DrawerItem label="Logout" onPress={() => router.replace("/")} /> */}
      </DrawerContentScrollView>
      <View
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#964a3b" }}
        onPress={() => router.replace("/")}
      >
        <Text>Logout</Text>
      </View>
    </View>
  );
}

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={customerDrawerContent}
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: "#964a3b",
          drawerActiveTintColor: "#fff",
          // drawerLabelStyle: { marginLeft: -28 },
        }}
      >
        <Drawer.Screen
          name="order"
          options={{
            drawerLabel: "Order",
            title: "Order",
            drawerIcon: ({ size, color }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="product"
          options={{
            drawerLabel: "Product",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="financial"
          options={{
            drawerLabel: "Financial",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
