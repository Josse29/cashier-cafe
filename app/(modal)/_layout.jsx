import { Stack } from "expo-router";

const ModalLayout = () => {
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
      <Stack.Screen
        name="resetpassword"
        options={{
          headerTitle: "Reset Password",
        }}
      />
    </Stack>
  );
};

export default ModalLayout;
