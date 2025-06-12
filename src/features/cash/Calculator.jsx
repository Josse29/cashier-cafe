import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { formatCurrency, formatCurrency1, unFormatCurrency } from "../../utils";
import { AllContext } from "../../context/AllProvider";
import { FontAwesome } from "@expo/vector-icons";

const Calculator = () => {
  const { cartSum } = useContext(AllContext);
  const [showCal, setShowCal] = useState(false);
  const [payment, setPayment] = useState(0);
  const [change, setChange] = useState("");
  const handleChange = (txt) => {
    const raw = unFormatCurrency(txt) || cartSum.price;
    setPayment(formatCurrency(txt));
    setChange(raw - cartSum.price);
  };
  return (
    <View>
      <TouchableOpacity className="mb-2" onPress={() => setShowCal(!showCal)}>
        <View className="flex flex-row gap-3 items-center">
          <FontAwesome name="calculator" size={15} color="black" />
          <Text className="font-montserratbold text-lg">Calculator</Text>
        </View>
      </TouchableOpacity>
      {showCal && (
        <View>
          <View className="flex flex-row gap-4 mb-1">
            <Text className="font-montserratbold text-lg">Total :</Text>
            <Text className="font-montserratbold text-lg">
              {formatCurrency1(cartSum.price)}
            </Text>
          </View>
          <View className="flex flex-row gap-4 mb-1">
            <Text className="font-montserratbold text-lg mb-1">Payment :</Text>
            <TextInput
              placeholder="ex : $ 10.00"
              className="p-0 border-b border-b-slate-300 w-[120px] font-montserratbold"
              onChangeText={handleChange}
              value={payment}
            />
          </View>
          <View className="flex flex-row gap-4 mb-1">
            <Text className="font-montserratbold text-lg">Change :</Text>
            <Text className="font-montserratbold text-lg">
              {change >= 0 && formatCurrency1(change)}
              {change < 0 && `- ${formatCurrency1(Math.abs(change))}`}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Calculator;
