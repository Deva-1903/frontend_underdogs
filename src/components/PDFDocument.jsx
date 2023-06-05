import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../assets/logo.jpg";

const PDFDocument = ({ startDate, endDate, selectedAdmin, users }) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      padding: "20px",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 20,
    },
    logo: {
      marginBottom: 20,
      width: 100,
      height: 100,
    },
    subtitle: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 10,
    },
    tableContainer: {
      width: "80%",
    },
    table: {
      display: "table",
      width: "100%",
      borderCollapse: "collapse",
    },
    tableRow: {
      flexDirection: "row",
      backgroundColor: "#f8f8f8",
      borderBottom: "1px solid #ddd",
      padding: "8px",
      textAlign: "center",
    },
    tableHeader: {
      fontWeight: "bold",
      padding: "8px",
      borderRight: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
    },
    tableData: {
      padding: "8px",
      borderRight: "1px solid #ddd",
      borderBottom: "1px solid #ddd",
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <Image src={logo} style={styles.logo} />
        <Text className="text-2xl font-bold mb-4">Fees Details</Text>
        <Text className="text-lg mb-2">Start Date: {startDate}</Text>
        <Text className="text-lg mb-2">End Date: {endDate}</Text>
        <Text className="text-lg mb-4">Admin: {selectedAdmin}</Text>

        <View className="w-4/5">
          <View className="table w-full">
            <View className="table-row bg-gray-200 border-b border-gray-400">
              <Text className="table-header p-2 border-r border-gray-400">
                User ID
              </Text>
              <Text className="table-header p-2 border-r border-gray-400">
                User Name
              </Text>
              <Text className="table-header p-2 border-r border-gray-400">
                Subscription
              </Text>
              <Text className="table-header p-2 border-r border-gray-400">
                Subscription Type
              </Text>
              <Text className="table-header p-2 border-r border-gray-400">
                Mode of Payment
              </Text>
              <Text className="table-header p-2 border-r border-gray-400">
                Admin
              </Text>
              <Text className="table-header p-2 border-r border-gray-400">
                Transaction Type
              </Text>
              <Text className="table-header p-2 border-r border-gray-400">
                Date
              </Text>
              <Text className="table-header p-2">Time</Text>
            </View>

            {users.map((user) => (
              <View
                key={user.user_id}
                className="table-row border-b border-gray-400"
              >
                <Text className="table-data p-2 border-r border-gray-400">
                  {user.user_id}
                </Text>
                <Text className="table-data p-2 border-r border-gray-400">
                  {user.user_name}
                </Text>
                <Text className="table-data p-2 border-r border-gray-400">
                  {user.subscription}
                </Text>
                <Text className="table-data p-2 border-r border-gray-400">
                  {user.subscription_type}
                </Text>
                <Text className="table-data p-2 border-r border-gray-400">
                  {user.mode_of_payment}
                </Text>
                <Text className="table-data p-2 border-r border-gray-400">
                  {user.admin}
                </Text>
                <Text className="table-data p-2 border-r border-gray-400">
                  {user.transaction_type}
                </Text>
                <Text className="table-data p-2 border-r border-gray-400">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Text>
                <Text className="table-data p-2">
                  {new Date(user.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
