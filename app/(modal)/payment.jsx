import { View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingComponent, Spinner } from "../../src/components";
import { Calculator, CreateCash1, ListCash1 } from "../../src/features/cash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllContext } from "../../src/context/AllProvider";
import { getStorage } from "../../src/utils";
const Payment = () => {
  const { isKeyboardVisible } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const storage = async () => {
    setLoading(true);
    try {
      const orders = await getStorage("order");
      setOrder(orders);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    storage();
  }, []);
  return (
    <KeyboardAvoidingComponent>
      <View className="bg-white flex-1">
        <FlatList
          data={loading ? [{}] : order}
          renderItem={({ item }) =>
            loading ? (
              <View
                className="h-screen justify-center"
                style={{ paddingBottom: bottom + 60 }}
              >
                <Spinner />
              </View>
            ) : (
              order.length >= 1 && <ListCash1 data={item} />
            )
          }
          keyExtractor={(item, index) =>
            item?.ProductId?.toString() || index.toString()
          }
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            padding: 16,
          }}
        />
        {!loading && order.length >= 1 && (
          <View
            className="items-end my-2 p-5"
            style={{
              paddingBottom: isKeyboardVisible ? bottom + top * 2 : bottom + 20,
            }}
          >
            <CreateCash1 />
            <Calculator />
          </View>
        )}
      </View>
    </KeyboardAvoidingComponent>
  );
};

export default Payment;
