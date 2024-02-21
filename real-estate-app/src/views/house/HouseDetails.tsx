import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

import { AgentCallCard } from '@components';
import { mainColor, secondaryColor, skyColor } from '@utils';
import {
  calculatePrice,
  contractHouse,
  getHouseById,
} from 'src/services/house/house';

const HouseDetails = ({ navigation, route }: any) => {
  const [house, setHouse] = useState<any>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [isContract, setIsContract] = useState<boolean>(false);

  useEffect(() => {
    getHouseById(route.params.id)
      .then((res) => {
        console.log(res);
        setHouse(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isContract]);

  const handleContract = (id: number) => {
    const data = {
      estateID: id,
      amount: house.price,
    };
    setIsContract(!isContract);
    Alert.alert('Contract', 'Do you want to send an inquiry?', [
      {
        text: `Cancel`,
        style: 'cancel',
      },
      { text: 'OK', onPress: () => contractHouse(data) },
    ]);
  };

  const handleCalculate = () => {
    const data = {
      total_price: house.price,
      down_payment_percentage: percentage,
      loan_term_years: years,
      interest_rate: interest,
    };
    calculatePrice(data).then((res) => {
      navigation.navigate('MortgageDetails', { data: res });
    });
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={{ width: '100%', height: 300, borderRadius: 12 }}
          source={{
            uri: house?.photo
              ? house?.photo
              : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8fDA%3D',
          }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.priceText}>${house?.price}</Text>

          <Text style={styles.addressText}>
            1234 Main St, San Francisco, CA 94122
          </Text>

          <View style={styles.infoWrapper}>
            <View style={styles.infoContainer}>
              <Icon name='bed-outline' size={20} color={secondaryColor} />
              <Text style={styles.infoText}>3</Text>
            </View>
            <View style={styles.infoContainer}>
              <IconMaterial
                name='bathtub-outline'
                size={20}
                color={secondaryColor}
              />
              <Text style={styles.infoText}>2</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name='car-outline' size={20} color={secondaryColor} />
              <Text style={styles.infoText}>2</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon name='cube-outline' size={20} color={secondaryColor} />
              <Text style={styles.infoText}>{house?.square_footage}</Text>
            </View>
          </View>
          {/* calculate */}
          <View style={styles.calculateContainer}>
            <Text style={styles.calculateTitle}>Calculate Mortgage:</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Down Payment Percentage:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  placeholder='Enter percentage'
                  onChangeText={(value) => setPercentage(Number(value))}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Loan Term (Years):</Text>
                <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  placeholder='Enter years'
                  onChangeText={(value) => setYears(Number(value))}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Enter Interest Rate:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType='numeric'
                  placeholder='Enter interest rate'
                  onChangeText={(value) => setInterest(Number(value))}
                />
              </View>
            </View>
            <Pressable
              style={styles.percentageButton}
              onPress={handleCalculate}
            >
              <Text style={styles.percentageText}>View Percentages</Text>
            </Pressable>
          </View>
          {/* calculate */}
          <AgentCallCard agent={house?.agentID} navigation={navigation} />
          <Text style={styles.description}>{house?.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable
          disabled={house?.status === 'RSD'}
          onPress={() => handleContract(house.id)}
          style={
            house?.status === 'RSD'
              ? { ...styles.sendButton, backgroundColor: 'gray' }
              : styles.sendButton
          }
        >
          <Text style={styles.sendText}>
            {house?.status === 'RSD'
              ? 'Not Available'
              : isContract
              ? 'Inquiry Sent'
              : 'Send Inquiry'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HouseDetails;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: 16,
    gap: 20,
  },
  infoWrapper: {
    flexDirection: 'row',
    gap: 20,
  },
  priceText: {
    color: mainColor,
    fontWeight: 'bold',
  },
  addressText: {
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    color: secondaryColor,
  },
  description: {
    color: secondaryColor,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    flex: 1,
    padding: 10,
  },
  sendButton: {
    backgroundColor: mainColor,
    borderRadius: 12,
    padding: 14,
    textAlign: 'center',
  },
  sendText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  // calculate
  calculateContainer: {
    marginTop: 20,
  },
  calculateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  percentageButton: {
    backgroundColor: skyColor,
    padding: 10,
    borderRadius: 10,
  },
  percentageText: {
    color: mainColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // input: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   padding: 10,
  //   width: '50%',
  // },
  // calculate
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Добавляем выравнивание по центру
    marginBottom: 10, // Уменьшаем отступ между строками
  },
  inputContainer: {
    flex: 1, // Распределение пространства равномерно между TextInput элементами
    marginRight: 10, // Отступ между TextInput элементами
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%', // Ширина TextInput элементов занимает всю доступную ширину контейнера
  },
});
