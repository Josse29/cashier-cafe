import { View, Text } from "react-native";
import React from "react";
import { KeyboardAvoidingComponent } from "../../src/components";
import { UpdateProduct } from "./../../src/features/product";

const ModalUpdateProduct = () => {
  return (
    <KeyboardAvoidingComponent>
      <UpdateProduct />
    </KeyboardAvoidingComponent>
  );
};

export default ModalUpdateProduct;
