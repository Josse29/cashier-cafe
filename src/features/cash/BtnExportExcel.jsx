import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { getCashAPI } from "../../services/cash";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

const BtnExportExcel = () => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const { data } = await getCashAPI();
      console.log(data);
      if (!data || data.length === 0) {
        Alert.alert("Cash is Empty...");
        setLoading(false);
        return;
      }
      // Convert to sheet and workbook
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Transaction");
      const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
      const fileName = `Transaction_${Date.now()}.xlsx`;
      const uri = FileSystem.cacheDirectory + fileName;
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
      if (Platform.OS !== "web") {
        await Sharing.shareAsync(uri, {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          dialogTitle: "Download Excel",
          UTI: "com.microsoft.excel.xlsx",
        });
      } else {
        Alert.alert("Success ", "File Saved On : " + uri);
      }
    } catch (error) {
      console.error("Export error: ", error);
      Alert.alert("Gagal", "Gagal export data ke Excel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleExport} disabled={loading}>
      <View className="flex flex-row items-center gap-4">
        <Text className="font-montserratbold text-2xl text-[#c5624e]">
          Transaction
        </Text>
        <MaterialIcons name="download-for-offline" size={40} color="#c5624e" />
      </View>
    </TouchableOpacity>
  );
};

export default BtnExportExcel;
