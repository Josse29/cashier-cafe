import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getUserAPI, updateUserAPI } from "../../services/user";
import {
  Alerts,
  InputImg,
  InputTxt,
  InputTxtMulti,
  Spinner,
} from "../../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllContext } from "../../context/AllProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const UpdateUser = () => {
  const { isKeyboardVisible, userSuccess, setUserSuccess } =
    useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState({
    userId: 0,
    userName: "",
    userFullname: "",
    userEmail: "",
    img: "",
    userInfo: "",
  });
  const scrollViewRef = useRef(null);
  const getUser = async () => {
    setLoading(true);
    try {
      const users = await getUserAPI();
      setReq({
        userId: users.UserId,
        userName: users.UserName,
        userFullname: users.UserFullname,
        userEmail: users.UserEmail,
        img: users.UserImg,
        userInfo: users.UserInfo,
      });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const [errMsg, setErrMsg] = useState("");
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updated = await updateUserAPI({
        userName: req.userName,
        userFullname: req.userFullname,
        userEmail: req.userEmail,
        userImg: req.img || "",
        userInfo: req.userInfo,
      });
      await getUser();
      setErrMsg("");
      setUserSuccess(updated);
    } catch (error) {
      setUserSuccess("");
      console.log(error.message);
      setErrMsg(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View className="flex-1 bg-white">
      {loading && (
        <View className="m-auto" style={{ paddingBottom: bottom + 40 }}>
          <Spinner />
        </View>
      )}
      {!loading && (
        <>
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 15 }}
          >
            {/* alert */}
            <Alerts
              status="success"
              msg={userSuccess}
              setMsg={setUserSuccess}
            />
            {/* alert */}
            <Alerts status="error" msg={errMsg} setMsg={setErrMsg} />
            {/* reset password */}
            <View className="items-end">
              <TouchableOpacity
                className="flex flex-row gap-3 items-center bg-yellow-600 px-2 py-1 rounded-md"
                onPress={() => router.push("(modal)/resetpassword")}
              >
                <MaterialIcons name="key" size={20} color="white" />
                <Text className="font-montserratbold text-white text-lg">
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
            {/* UserName */}
            <InputTxt
              title="Username :"
              color="#964a3b"
              placeholder="ex : josse112"
              value={req.userName}
              field="userName"
              req={req}
              setReq={setReq}
            />
            {/* UserFullname */}
            <InputTxt
              title="Fullname :"
              color="#964a3b"
              placeholder="ex : josse112"
              value={req.userFullname}
              field="userFullname"
              req={req}
              setReq={setReq}
            />
            {/* UserEmail */}
            <InputTxt
              title="Email :"
              color="#964a3b"
              placeholder="ex : pinemjosse@gmail.com"
              value={req.userEmail}
              field="userEmail"
              req={req}
              setReq={setReq}
            />
            {/* UserImg */}
            <InputImg
              title="Photo :"
              color="#964a3b"
              req={req}
              setReq={setReq}
              setLoading={setLoading}
            />
            {/* information */}
            <InputTxtMulti
              color="#964a3b"
              req={req}
              setReq={setReq}
              field="userInfo"
              value={req.userInfo}
              placeholder="ex : desc your bussiness detail....."
            />
          </ScrollView>
          {/* button update */}
          <View
            className="p-4 border-t border-t-[#d1c6c4] bg-white"
            style={{
              paddingBottom: isKeyboardVisible ? bottom + 60 : bottom + 20,
            }}
          >
            <TouchableOpacity
              className="bg-[#964a3b] px-4 py-3 rounded-md"
              disabled={loading}
              onPress={handleUpdate}
            >
              <Text className="text-white font-montserratbold text-center text-2xl">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default UpdateUser;
