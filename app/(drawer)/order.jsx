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

const Order = () => {
  const {
    productSuccess,
    paymentRef,
    cartSum,
    isKeyboardVisible,
    orderSuccess,
    setOrderSuccess,
    orderRef,
  } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
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
      orderRef.current?.scrollToOffset({ animated: true, offset: 0 });
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct(req);
  }, []);
  useEffect(() => {
    if (productSuccess) {
      getProduct(req);
    }
  }, [productSuccess]);
  return (
    <View className="flex-1 bg-white" style={{ paddingBottom: bottom }}>
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
          ref={orderRef}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View className="mb-3">
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
            </View>
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
            padding: 15,
          }}
        />
        {/* btnPayment */}
        {!loading && product.length >= 1 && cartSum.price > 0 && (
          <Animatable.View
            animation="fadeInDown"
            duration={500}
            // ref={paymentRef}
          >
            <View
              className="px-3"
              style={{
                paddingBottom: isKeyboardVisible ? bottom * 3 : 10,
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
