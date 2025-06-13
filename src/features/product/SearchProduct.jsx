import React, { useRef } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

const SearchProduct = (props) => {
  const { getAPI, setReq, req, setLoading } = props;
  const searchTimeout = useRef(null);
  const handleChange = (txt) => {
    setLoading(true);
    setReq((prev) => ({
      ...prev,
      search: txt,
      offset: 1,
    }));
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      await getAPI({
        search: txt,
        limit: req.limit,
        offset: 1,
      });
    }, 1000);
  };
  return (
    <View
      className="bg-[#ECDEBB] rounded-md flex flex-row justify-between items-center px-3 mb-3"
      // onPress={() => {}}
    >
      <TextInput
        className="font-montserratbold text-xl text-[#856c3e] h-[50px]"
        placeholder="Search Product......"
        placeholderTextColor="#A8884D"
        onChangeText={handleChange}
      />
      <Entypo
        name="magnifying-glass"
        size={24}
        color="#A8884D"
        className="mb-1"
      />
    </View>
  );
};

export default SearchProduct;
