import { View, Text, Button, ScrollView, ToastAndroid } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Profile = () => {
  const { bottom } = useSafeAreaInsets();
  const showToast = () => {};
  return (
    <SafeAreaView style={{ paddingBottom: bottom }}>
      <ScrollView>
        <Button title="Show toast" onPress={showToast} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
