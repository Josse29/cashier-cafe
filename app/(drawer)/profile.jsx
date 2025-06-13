import React from "react";
import { View, Text, Button, ScrollView, ToastAndroid } from "react-native";
import { KeyboardAvoidingComponent } from "../../src/components";
import { UpdateUser } from "../../src/features/user";

const Profile = () => {
  return (
    <KeyboardAvoidingComponent>
      <UpdateUser />
    </KeyboardAvoidingComponent>
  );
};

export default Profile;
