import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingComponent, Spinner } from "../../src/components";
import { getStorage } from "../../src/utils";
import { ListCash1 } from "../../src/features/cash";
const Payment = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderSum, setOrderSum] = useState({
    qty: 0,
    balance: 0,
  });
  const storage = async () => {
    setLoading(true);
    try {
      const order = await getStorage("order");
      setOrder(order);
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
    <View className="bg-white h-full p-5">
      <FlatList
        data={loading ? [{}] : order}
        renderItem={({ item }) =>
          loading ? <Spinner /> : order.length >= 1 && <ListCash1 data={item} />
        }
      />
      <View className="pb-2 border-b-2 border-b-slate-300">
        <View className="mb-2">
          <Text className="text-xl font-montserratbold mb-2">ProductName </Text>
          <Text className="text-lg font-montserratbold ms-2">
            @Product priice x 1 = totalprice
          </Text>
        </View>
      </View>
      <View className="items-end my-2">
        <Text className="font-montserratbold text-xl mb-2">Qty : 1</Text>
        <Text className="font-montserratbold text-xl mb-2">Total : 100</Text>
        {/* <Text className="font-montserratbold text-xl mb-2">
            Payment : 100
          </Text> */}
      </View>
    </View>
  );
};

export default Payment;
