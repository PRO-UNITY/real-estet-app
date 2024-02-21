import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import { mainColor } from '@utils';

const AgentCallCard = ({ agent, navigation }: any) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Chat', {
          userId: agent.id,
        })
      }
      style={styles.container}
    >
      <View style={styles.avatarContainer}>
        <Image
          style={styles.image}
          source={{
            uri: agent?.avatar
              ? agent?.avatar
              : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
          }}
        />
        <Text style={styles.name}>{agent?.username}</Text>
        <Text style={styles.name}>{agent?.last_name}</Text>
      </View>
      <Pressable style={styles.callButton}>
        <Icon name='chatbox-outline' size={20} color={'#fff'} />
      </Pressable>
    </Pressable>
  );
};

export default AgentCallCard;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e5e6',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  callButton: {
    padding: 10,
    backgroundColor: mainColor,
    borderRadius: 30,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
