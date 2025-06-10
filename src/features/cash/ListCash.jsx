import { View, Text } from "react-native";
import React from "react";
import { formatCurrency1, formatDate } from "../../utils";

const ListCash = (props) => {
  const { data } = props;
  const { CashDate, CashName, CashTime, CashBalance } = data;
  return (
    <View className="flex flex-row justify-between items-center pb-4 border-b-2 border-b-slate-200 mb-4">
      <View>
        <Text className="font-montserratbold text-xl mb-1">{CashName}</Text>
        <Text className="font-montserrat text-sm">{formatDate(CashDate)}</Text>
      </View>
      <View>
        <Text
          className={`font-montserratbold text-2xl ${
            CashBalance ? "text-[#c5624e]" : "text-[#562f28]"
          }`}
        >
          {CashBalance >= 1
            ? `+ ${formatCurrency1(CashBalance)}`
            : `- ${formatCurrency1(Math.abs(CashBalance))}`}
        </Text>
      </View>
    </View>
  );
};

export default ListCash;
