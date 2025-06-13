import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { delay, formatCurrency1 } from "./../../src/utils";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alerts, Spinner, TxtTruncate } from "../../src/components";
import { AllContext } from "../../src/context/AllProvider";
import { getCashAPI } from "../../src/services/cash";
import { BtnExportExcel, ListCash } from "../../src/features/cash";

const Financial = () => {
  const { cashSuccess, setCashSuccess, financialRef } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [cashTotal, setCashTotal] = useState(0);
  const [cash, setCash] = useState([]);
  const getCash = async () => {
    setLoading(true);
    try {
      const { CashSum, data } = await getCashAPI();
      setCashTotal(CashSum);
      setCash(data);
    } catch (error) {
      throw error;
    } finally {
      await delay(100);
      financialRef.current?.scrollToOffset({ animated: true, offset: 0 });
      setLoading(false);
    }
  };
  useEffect(() => {
    if (cashSuccess) {
      getCash();
    }
  }, [cashSuccess]);
  useEffect(() => {
    getCash();
  }, []);

  return (
    <View className="bg-white flex-1" style={{ paddingBottom: bottom }}>
      {/* history */}
      <FlatList
        data={loading ? [{}] : cash}
        renderItem={({ item, index }) =>
          loading ? (
            <Spinner />
          ) : (
            cash.length >= 1 && <ListCash data={item} index={index} />
          )
        }
        keyExtractor={(item, index) =>
          item?.ProductId?.toString() || index.toString()
        }
        ListHeaderComponent={
          <>
            {/* total Cash */}
            <View className="my-5 items-end">
              <View className="flex flex-row items-center gap-2 mb-3">
                <Entypo name="wallet" size={24} color="#c5624e" />
                <Text className="text-center font-montserratbold tracking-wider text-xl text-[#c5624e]">
                  Total Cash :
                </Text>
              </View>
              <TxtTruncate
                title={`${
                  cashTotal > 0
                    ? `+ ${formatCurrency1(cashTotal)}`
                    : `${formatCurrency1(0)}`
                }`}
                className="font-montserratbold tracking-wider text-3xl text-white bg-[#c5624e] px-3 py-1 rounded-xl"
              />
            </View>
            {/* export excel && create  */}
            <View className="flex flex-row justify-between items-center my-4">
              <BtnExportExcel />
              <View className="flex flex-row gap-3">
                {/* cash in */}
                <TouchableOpacity
                  className="bg-[#c5624e] h-[45px] w-[45px] rounded-full flex justify-center items-center"
                  onPress={() =>
                    router.push({
                      pathname: "/(modal)/createcashin",
                      params: { cashTotal },
                    })
                  }
                >
                  <Entypo name="plus" size={30} color="white" />
                </TouchableOpacity>
                {/* cash out */}
                <TouchableOpacity
                  className="bg-[#562f28] h-[45px] w-[45px] rounded-full flex justify-center items-center"
                  onPress={() =>
                    router.push({
                      pathname: "/(modal)/createcashout",
                      params: { cashTotal },
                    })
                  }
                >
                  <Entypo name="minus" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            {/* alert */}
            {cashSuccess && (
              <Alerts
                status="success"
                msg={cashSuccess}
                setMsg={setCashSuccess}
              />
            )}
          </>
        }
        ListEmptyComponent={
          !loading && (
            <Text className="text-center text-[#856c3e] font-montserratsemibolditalic text-2xl my-5">
              Cash Empty...
            </Text>
          )
        }
        contentContainerStyle={{
          padding: 16,
          gap: 5,
          paddingBottom: bottom,
          // flexGrow: 1,
        }}
        ref={financialRef}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
};

export default Financial;
