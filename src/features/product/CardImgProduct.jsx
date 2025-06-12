import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Coffee } from "../../assets";
import { Entypo } from "@expo/vector-icons";
import { formatCurrency1, getStorage, saveStorage } from "../../utils";
import { TxtTruncate } from "../../components";
import { AllContext } from "../../context/AllProvider";

const CardImgProduct = (props) => {
  const { setCartSum, paymentRef } = useContext(AllContext);
  const { data } = props;
  const { ProductId, ProductName, ProductPrice, ProductImg } = data;
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadQty = async (id) => {
    setLoading(true);
    try {
      const order = await getStorage("order");
      const current = order.find((el) => el.ProductId === id);
      // summary
      const qty = order.reduce((sum, item) => sum + item.ProductQty, 0);
      const price = order.reduce(
        (sum, item) => sum + item.ProductPrice * item.ProductQty,
        0
      );
      setCartSum({ price, qty });
      setQty(current?.ProductQty || 0);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleQty = async (e, id, name, price) => {
    setLoading(true);
    try {
      const order = await getStorage("order");
      if (e === "push") {
        const productIndex = order.findIndex((el) => el.ProductId === id);
        if (productIndex !== -1) {
          order[productIndex].ProductQty += 1;
        } else {
          order.push({
            ProductId: id,
            ProductName: name,
            ProductPrice: price,
            ProductQty: 1,
          });
          order.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
        }
      }
      if (e === "pull") {
        const productIndex = order.findIndex((el) => el.ProductId === id);
        if (order[productIndex].ProductQty >= 1) {
          order[productIndex].ProductQty -= 1;
        }
        if (order[productIndex].ProductQty === 0) {
          order.splice(productIndex, 1);
        }
      }
      await saveStorage("order", order);
      await loadQty(id);
      if (paymentRef.current) {
        paymentRef.current.fadeInDown(500);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadQty(ProductId);
  }, []);
  return (
    <View
      className="flex flex-row w-full mb-5 bg-white min-h-[150px]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image
        source={
          ProductImg ? { uri: `data:image/jpeg;base64,${ProductImg}` } : Coffee
        }
        className="w-[40%] h-full"
      />
      <View className="w-[60%] justify-center p-3 rounded-r-2xl">
        {/* product name */}
        <TxtTruncate
          title={ProductName}
          className="font-montserratextrabold text-xl tracking-wider mb-2"
          lines={2}
        />
        {/* price */}
        <TxtTruncate
          title={formatCurrency1(ProductPrice)}
          className="font-montserratbold text-lg tracking-wider text-[#856c3e] mb-3"
        />
        {/* plus minus */}
        <View className="flex flex-row items-center justify-between">
          {/* btn minus plus */}
          <View className="flex flex-row gap-2">
            {/* plus */}
            <TouchableOpacity
              className={`bg-[#B67D03] w-[32px] h-[32px] flex rounded-md ${
                loading ? "opacity-55" : "opacity-100"
              }`}
              onPress={() =>
                handleQty("push", ProductId, ProductName, ProductPrice)
              }
              disabled={loading}
            >
              <Entypo name="plus" size={24} color="white" className="m-auto" />
            </TouchableOpacity>
            {/* minus */}
            <TouchableOpacity
              className={`bg-[#79756E] w-[32px] h-[32px] flex rounded-md ${
                loading ? "opacity-55" : "opacity-100"
              }`}
              onPress={() =>
                handleQty("pull", ProductId, ProductName, ProductPrice)
              }
              disabled={loading}
            >
              <Entypo name="minus" size={24} color="white" className="m-auto" />
            </TouchableOpacity>
          </View>
          {/* qty */}
          {qty > 0 && (
            <View className="flex w-[42px] h-[42px] bg-[#B67D03] rounded-full">
              <Text className="m-auto text-white font-montserratbold text-xl">
                {qty}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardImgProduct;
