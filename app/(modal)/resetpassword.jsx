import { ScrollView, View } from "react-native";
import { KeyboardAvoidingComponent } from "../../src/components";
import { ResetPassword } from "../../src/features/user";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ModalResetPassword = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingComponent>
      <View
        className="flex-1 bg-white"
        style={{
          paddingBottom: bottom + top,
        }}
      >
        <ScrollView
          contentContainerStyle={{ margin: "auto", padding: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <ResetPassword />
        </ScrollView>
      </View>
    </KeyboardAvoidingComponent>
  );
};

export default ModalResetPassword;
