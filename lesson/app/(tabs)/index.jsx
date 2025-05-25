import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import "./../../global.css";
import { router } from "expo-router";

export default function App() {
  return (
    <>
      <View>
        <Text className="text-red-600">
          Open up App.js to start working on your applications !
        </Text>
      </View>
      <View>
        {/* <Text>FormLogin</Text> */}
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/users/[id]",
              params: { id: 1 },
            })
          }
        >
          <Text>Go To Profile</Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
