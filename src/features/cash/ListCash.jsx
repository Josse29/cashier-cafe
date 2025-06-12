import { View, Text } from "react-native";
import React from "react";
import { formatCurrency1, formatDate } from "../../utils";
import { TxtTruncate } from "../../components";

const ListCash = (props) => {
  const { data } = props;
  const { CashDate, CashTime, CashName, CashBalance } = data;
  return (
    <>
      <View className="flex flex-row justify-between mb-1">
        <TxtTruncate
          title={formatDate(CashDate)}
          className="font-montserrat text-sm"
        />
        <TxtTruncate title={CashTime} className="font-montserrat text-sm" />
      </View>
      <TxtTruncate
        title={CashName}
        className="font-montserratbold text-xl mb-2"
      />
      <View className="pb-4 border-b-2 border-b-slate-200 mb-2">
        <TxtTruncate
          title={
            CashBalance >= 1
              ? `+ ${formatCurrency1(CashBalance)}`
              : `- ${formatCurrency1(Math.abs(CashBalance))}`
          }
          className={`font-montserratbold ms-2 text-xl self-start px-2 py-1 rounded-md text-white ${
            CashBalance >= 1 ? "bg-teal-600" : "bg-red-600"
          }`}
        />
      </View>
    </>
  );
};

export default ListCash;
