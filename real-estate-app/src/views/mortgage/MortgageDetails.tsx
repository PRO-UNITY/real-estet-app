// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';

// const MortgageDetailsScreen = ({ route }: any) => {
//   const mortgageData = route.params.data;

//   const handleDownloadExcel = async () => {
//     try {
//       let excelData = '';
//       Object.keys(mortgageData).forEach((monthKey, index) => {
//         excelData += `Month ${index + 1}\n`;
//         Object.keys(mortgageData[monthKey]).forEach(
//           (paymentKey, paymentIndex) => {
//             excelData += `Principal Payment: ${mortgageData[monthKey][paymentKey].principal_payment}\n`;
//             excelData += `Interest Payment: ${mortgageData[monthKey][paymentKey].interest_payment}\n`;
//             excelData += `Remaining Balance: ${mortgageData[monthKey][paymentKey].remaining_balance}\n\n`;
//           }
//         );
//       });
//       const filePath = FileSystem.cacheDirectory + 'mortgage_details.xlsx';
//       await FileSystem.writeAsStringAsync(filePath, excelData, {
//         encoding: FileSystem.EncodingType.UTF8,
//       });
//       await Sharing.shareAsync(filePath, {
//         mimeType:
//           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         dialogTitle: 'Download Mortgage Details',
//         UTI: 'com.microsoft.excel.xlsx',
//       });
//     } catch (error) {
//       console.error('Error while downloading Excel file:', error);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Mortgage Details</Text>
//       {Object.keys(mortgageData).map((monthKey, index) => (
//         <View key={index} style={styles.item}>
//           <Text style={styles.title}>Month {index + 1}</Text>
//           {Object.keys(mortgageData[monthKey]).map(
//             (paymentKey, paymentIndex) => (
//               <View key={paymentIndex} style={styles.paymentContainer}>
//                 <Text style={styles.paymentText}>
//                   Principal Payment: $
//                   {mortgageData[monthKey][paymentKey].principal_payment}
//                 </Text>
//                 <Text style={styles.paymentText}>
//                   Interest Payment: $
//                   {mortgageData[monthKey][paymentKey].interest_payment}
//                 </Text>
//                 <Text style={styles.paymentText}>
//                   Remaining Balance: $
//                   {mortgageData[monthKey][paymentKey].remaining_balance}
//                 </Text>
//               </View>
//             )
//           )}
//         </View>
//       ))}
//       <Pressable onPress={handleDownloadExcel}>
//         <Text>Download Excel</Text>
//       </Pressable>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     paddingBottom: 100,
//     backgroundColor: '#f0f0f0',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   item: {
//     marginBottom: 20,
//     borderWidth: 2,
//     borderRadius: 10,
//     padding: 10,
//     borderColor: '#ccc',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   paymentContainer: {
//     marginBottom: 10,
//   },
//   paymentText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default MortgageDetailsScreen;

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const MortgageDetailsScreen = ({ route }: any) => {
  const mortgageData = route.params.data;

  const handleDownloadExcel = async () => {
    try {
      let excelData = '';
      Object.keys(mortgageData).forEach((monthKey, index) => {
        excelData += `Month ${index + 1}\n`;
        Object.keys(mortgageData[monthKey]).forEach(
          (paymentKey, paymentIndex) => {
            excelData += `Principal Payment: ${mortgageData[monthKey][paymentKey].principal_payment}\n`;
            excelData += `Interest Payment: ${mortgageData[monthKey][paymentKey].interest_payment}\n`;
            excelData += `Remaining Balance: ${mortgageData[monthKey][paymentKey].remaining_balance}\n\n`;
          }
        );
      });
      const filePath = FileSystem.cacheDirectory + 'mortgage_details.xlsx';
      await FileSystem.writeAsStringAsync(filePath, excelData, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await Sharing.shareAsync(filePath, {
        mimeType:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Download Mortgage Details',
        UTI: 'com.microsoft.excel.xlsx',
      });
    } catch (error) {
      console.error('Error while downloading Excel file:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mortgage Details</Text>
      {Object.keys(mortgageData).map((monthKey, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.title}>Month {index + 1}</Text>
          {Object.keys(mortgageData[monthKey]).map(
            (paymentKey, paymentIndex) => (
              <View key={paymentIndex} style={styles.paymentContainer}>
                <Text style={styles.paymentText}>
                  Principal Payment: $
                  {mortgageData[monthKey][paymentKey].principal_payment}
                </Text>
                <Text style={styles.paymentText}>
                  Interest Payment: $
                  {mortgageData[monthKey][paymentKey].interest_payment}
                </Text>
                <Text style={styles.paymentText}>
                  Remaining Balance: $
                  {mortgageData[monthKey][paymentKey].remaining_balance}
                </Text>
              </View>
            )
          )}
        </View>
      ))}
      <Pressable onPress={handleDownloadExcel} style={styles.button}>
        <Text style={styles.buttonText}>Download Excel</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentContainer: {
    marginBottom: 10,
  },
  paymentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 45,
    borderRadius: 8,
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MortgageDetailsScreen;
