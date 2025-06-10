import { View, Text, FlatList } from "react-native";
import {
  BtnPageProduct,
  CardImgProduct,
  SearchProduct,
} from "../../src/features/product";
import { BtnPayment } from "../../src/features/cash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import { getProductAPI } from "../../src/services/product";
import { AllContext } from "../../src/context/AllProvider";
import { Spinner } from "../../src/components";
import * as Animatable from "react-native-animatable";

const Order = () => {
  const { paymentRef, cartSum } = useContext(AllContext);
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const flatListRef = useRef(null);
  const [req, setReq] = useState({
    search: "",
    limit: 4,
    offset: 1,
  });
  const getProduct = async (req) => {
    setLoading(true);
    try {
      const { products, pagination } = await getProductAPI(req);

      setProduct(products);
      setTotalPage(pagination);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct(req);
  }, []);
  return (
    <View className="bg-white h-full">
      <FlatList
        data={loading ? [{}] : product}
        renderItem={({ item }) =>
          loading ? (
            <Spinner />
          ) : (
            product.length >= 1 && <CardImgProduct data={item} />
          )
        }
        keyExtractor={(item, index) =>
          item?.ProductId?.toString() || index.toString()
        }
        ref={flatListRef}
        keyboardShouldPersistTaps="always"
        ListHeaderComponent={
          <SearchProduct
            getAPI={getProduct}
            setReq={setReq}
            req={req}
            setLoading={setLoading}
          />
        }
        ListFooterComponent={
          !loading &&
          product.length >= 1 && (
            <View style={{ marginVertical: 26 }}>
              <BtnPageProduct
                totalPage={totalPage}
                req={req}
                setReq={setReq}
                getAPI={getProduct}
                setLoading={setLoading}
              />
            </View>
          )
        }
        ListEmptyComponent={
          loading ? (
            <Spinner />
          ) : (
            <Text className="text-center text-[#856c3e] font-montserratsemibolditalic text-2xl my-5">
              Product is Empty...
            </Text>
          )
        }
        contentContainerStyle={{
          padding: 16,
          gap: 5,
        }}
      />
      {/* btnPayment */}
      {!loading && product.length >= 1 && cartSum > 0 && (
        <Animatable.View animation="fadeInDown" duration={500} ref={paymentRef}>
          <View className="px-3" style={{ paddingBottom: bottom + bottom }}>
            <BtnPayment />
          </View>
        </Animatable.View>
      )}
    </View>
  );
};

export default Order;
