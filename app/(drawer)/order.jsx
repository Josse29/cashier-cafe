import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  BtnPageProduct,
  CardImgProduct,
  SearchProduct,
} from "../../src/features/product";
import { BtnPayment } from "../../src/features/cash";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Order = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View>
      <ScrollView className="h-[85%]">
        <View className="p-5">
          {/* search */}
          <SearchProduct />
          {/* container & card img */}
          <View className="my-3 flex flex-row flex-wrap">
            <CardImgProduct />
            <CardImgProduct />
            <CardImgProduct />
            <CardImgProduct />
            <CardImgProduct />
          </View>
          {/* pagination */}
          <BtnPageProduct />
        </View>
      </ScrollView>
      {/* btnPayment */}
      <View className="px-3">
        <BtnPayment />
      </View>
    </View>
  );
};

export default Order;
