import { View, Text, FlatList, Keyboard, Platform } from "react-native";
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
import {
  Alerts,
  KeyboardAvoidingComponent,
  Spinner,
} from "../../src/components";
import * as Animatable from "react-native-animatable";
import { router } from "expo-router";
import { delay } from "../../src/utils";

const Order = () => {
  const {
    paymentRef,
    cartSum,
    isKeyboardVisible,
    orderSuccess,
    setOrderSuccess,
  } = useContext(AllContext);
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const flatListRef = useRef(null);
  const [req, setReq] = useState({
    search: "",
    limit: 10,
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
      // await delay(200);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct(req);
  }, []);
  useEffect(() => {
    if (orderSuccess) {
      getProduct(req);
    }
  }, [orderSuccess]);
  return (
    <View className="bg-white h-screen" style={{ paddingBottom: bottom }}>
      <KeyboardAvoidingComponent>
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
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <>
              <SearchProduct
                getAPI={getProduct}
                setReq={setReq}
                req={req}
                setLoading={setLoading}
              />
              {/* alert */}
              {orderSuccess && (
                <Alerts
                  status="success"
                  msg={orderSuccess}
                  setMsg={setOrderSuccess}
                />
              )}
            </>
          }
          ListFooterComponent={
            !loading &&
            product.length >= 1 && (
              <BtnPageProduct
                totalPage={totalPage}
                req={req}
                setReq={setReq}
                getAPI={getProduct}
                setLoading={setLoading}
              />
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
          }}
        />
        {/* btnPayment */}
        {!loading && product.length >= 1 && cartSum.price > 0 && (
          <Animatable.View
            animation="fadeInDown"
            duration={500}
            ref={paymentRef}
          >
            <View
              className="px-3"
              style={{
                paddingBottom: isKeyboardVisible ? bottom * 3 : bottom,
              }}
            >
              <BtnPayment />
            </View>
          </Animatable.View>
        )}
      </KeyboardAvoidingComponent>
    </View>
  );
};

export default Order;
