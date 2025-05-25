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
import { View, Text, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Josse } from "../assets";

function customerDrawerContent(props) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: "#dde3fe", paddingTop: top }}
      >
        <View>
          <Image
            source={Josse}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() => router.replace("/")} />
      </DrawerContentScrollView>
      <View
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#dde3fe" }}
      >
        <Text>Footer</Text>
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
          drawerActiveBackgroundColor: "#5363df",
          drawerActiveTintColor: "#fff",
          // drawerLabelStyle: { marginLeft: -28 },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "overview",
            drawerIcon: ({ size, color }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="users"
          options={{
            drawerLabel: "User",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
