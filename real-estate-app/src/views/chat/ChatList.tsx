import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import { getChatRooms } from 'src/services/chat/chat';
// import { statusAppointment } from '../../services/doctor/doctor';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ReviewModal from '../../components/review-modal/ReviewModal';
import { secondaryColor } from '../../utils/colors';

const ChatList = ({ navigation }: any) => {
  const [chatRooms, setChatRooms] = useState([
    {
      id: 1,
      receiver: {
        avatar:
          'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg',
        first_name: 'John',
      },
    },
  ]);
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    const response = await getChatRooms(1);
    console.log(response);
    const newChatRooms = response.results;
    setChatRooms((prevChatRooms) =>
      page === 1 ? newChatRooms : [...prevChatRooms, ...newChatRooms]
    );
    setPage((prevPage) => (response.next ? prevPage + 1 : prevPage));
  };

  //   useEffect(() => {
  //     AsyncStorage.getItem('role').then((res) => setRole(res || ''));
  //   }, []);

  const handleCompleteAppointment = (
    appointments: number,
    statusId: number
  ) => {
    const data = {
      appointments: appointments,
    };
    Alert.alert(
      'Complete Appointment',
      'Are you sure you want to complete this appointment?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // statusAppointment(data.appointments, statusId).then(() => {
            Alert.alert(
              'Appointment Completed',
              'The appointment has been completed.'
            );
            // });
          },
        },
      ]
    );
  };

  const renderUserItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => {
        console.log('Chat');

        navigation.navigate('Chat', {
          userId: item.id,
        });
      }}
    >
      <Image
        source={{
          uri: item.receiver.avatar
            ? item.receiver.avatar
            : 'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg',
        }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {item.type === 'initiator'
            ? item.initiator.first_name
            : item.receiver.first_name}
        </Text>
        {role === 'agent' && (
          <TouchableOpacity
            style={[
              item.is_activate
                ? styles.completeButton
                : styles.disableCompeteButton,
            ]}
            onPress={() => handleCompleteAppointment(item.appointments, 3)}
          >
            <Text style={styles.completeButtonText}>
              {item.is_activate ? 'Complete' : 'Completed'}
            </Text>
          </TouchableOpacity>
        )}
        {role === 'patient' && item.is_activate === false && (
          <TouchableOpacity
            onPress={() => setShowReviewModal(true)}
            style={styles.reviewButton}
          >
            <Text style={styles.completeButtonText}>Send review</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.time}></Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={chatRooms}
      renderItem={renderUserItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      //   onEndReached={fetchChatRooms}
      onEndReachedThreshold={0.1}
    />
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: 'blue',
    padding: 6,
    borderRadius: 5,
  },
  disableCompeteButton: {
    backgroundColor: 'red',
    padding: 6,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  reviewButton: {
    backgroundColor: secondaryColor,
    padding: 6,
    borderRadius: 5,
    marginTop: 10,
  },
  lastMessage: {
    color: '#555',
  },
  time: {
    color: '#777',
  },
});
