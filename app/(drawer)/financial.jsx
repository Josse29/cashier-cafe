import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatCurrency1 } from "./../../src/utils";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alerts, Spinner } from "../../src/components";
import { AllContext } from "../../src/context/AllProvider";
import { getCashAPI } from "../../src/services/cash";
import { ListCash } from "../../src/features/cash";

const Financial = () => {
  const { cashSuccess, setCashSuccess } = useContext(AllContext);
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [cashTotal, setCashTotal] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [cash, setCash] = useState([]);
  const getCash = async () => {
    setLoading(true);
    try {
      const { CashSum, data } = await getCashAPI();
      setCashTotal(CashSum);
      setCash(data);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCash();
  }, [cashSuccess]);
  const flatListRef = useRef(null);
  return (
    <View className="bg-white h-screen p-5">
      {/* history */}
      <FlatList
        data={loading ? [{}] : cash}
        renderItem={({ item }) =>
          loading ? <Spinner /> : cash.length >= 1 && <ListCash data={item} />
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
                  Total Cash
                </Text>
              </View>
              <Text
                className="font-montserratbold tracking-wider text-3xl"
                numberOfLines={expanded ? 2 : undefined}
                onPress={() => setExpanded(!expanded)}
              >
                {formatCurrency1(cashTotal)}
              </Text>
            </View>
            {/* create  */}
            <View className="flex flex-row justify-between items-center mb-5">
              <View>
                <Text className="font-montserratbold text-2xl text-[#c5624e]">
                  Transaction
                </Text>
              </View>
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
            <Alerts
              status="success"
              msg={cashSuccess}
              setMsg={setCashSuccess}
            />
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
          marginBottom: bottom,
        }}
        ref={flatListRef}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
};

export default Financial;
