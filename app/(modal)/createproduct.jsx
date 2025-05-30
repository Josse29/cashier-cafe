import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import CreateProduct from "../../src/client/features/product/CreateProduct";

const ModalCreateProduct = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      className="bg-white"
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <CreateProduct />
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default ModalCreateProduct;
