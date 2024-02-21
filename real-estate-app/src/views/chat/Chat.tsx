import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';

import { secondaryColor, mainColor, yellowColor, clearInputs } from '@utils';
import {
  getChatConversationById,
  putChatConversationById,
} from 'src/services/chat/chat';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {
//   getChatConversationById,
//   putChatConversationById,
// } from '../../services/chat/chat';
// import { clearInputs } from '../../utils/clearInputs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { statusAppointment } from '../../services/doctor/doctor';

const Chat = ({ route }: any) => {
  const [user, setUser] = useState<any>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingNextPage, setLoadingNextPage] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const pageRef = useRef<number>(1);

  useEffect(() => {
    // @ts-ignore
    getChatConversationById({
      convo_id: route.params.userId,
      page: pageRef.current,
    }).then((res) => {
      console.log(res);
      setMessages(res.results);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('role').then((res) => setRole(res || ''));
  }, []);

  const loadNextPage = async () => {
    if (loading || loadingNextPage) return;
    setLoadingNextPage(true);
    try {
      const nextPage = pageRef.current + 1;
      const response = await getChatConversationById({
        convo_id: route.params.userId,
        page: nextPage,
      });
      if (response.next === null) {
        console.log('End of Chat');
        return;
      } else {
        const newMessages = response.results.filter((newMessage: any) => {
          return !messages.some(
            (existingMessage) => existingMessage.id === newMessage.id
          );
        });
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        pageRef.current = nextPage;
      }
    } catch (error) {
      return;
    } finally {
      setLoadingNextPage(false);
    }
  };

  const handleSendMessage = () => {
    const newMessage = {
      text: inputText,
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    putChatConversationById({
      convo_id: route.params.userId,
      data: newMessage,
    });
    clearInputs([setInputText]);
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isInitiator = item.sender_type === 'initiator';
    const isReceiver = item.sender_type === 'receiver';

    return (
      <View
        style={[
          styles.messageContainer,
          isInitiator ? styles.initiatorMessage : styles.userMessage,
          isReceiver ? styles.receiverMessage : styles.userMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  const reversedMessages = [...messages].reverse();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}
    >
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={{
            uri: 'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg',
          }}
        />
        <Text style={styles.headerText}>Agent name</Text>
      </View>

      <FlatList
        data={reversedMessages}
        renderItem={renderMessage}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        contentContainerStyle={styles.contentContainer}
        onEndReachedThreshold={0.5}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const reachedEnd =
            nativeEvent.layoutMeasurement.height +
              nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height;
          if (reachedEnd) {
            loadNextPage();
          }
        }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Type a message'
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: mainColor,
    backgroundColor: '#f5f6fa',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 22,
  },
  headerText: {
    color: mainColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: yellowColor,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: secondaryColor,
  },
  initiatorMessage: {
    alignSelf: 'flex-end',
    backgroundColor: secondaryColor,
  },
  messageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: mainColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
