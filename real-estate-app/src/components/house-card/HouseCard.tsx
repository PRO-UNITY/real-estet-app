import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

import { mainColor, secondaryColor } from '@utils';

const HouseCard = ({ item, navigation }: any) => {
  console.log('houses');
  console.log(item);
  console.log('houses');

  return (
    <Pressable
      onPress={() => navigation.navigate('HouseDetails', { id: item.id })}
      style={styles.container}
    >
      <ImageBackground
        source={{
          uri: item.photo
            ? item.photo
            : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8fDA%3D',
        }}
        style={styles.image}
      >
        <View style={styles.header}>
          <Pressable style={styles.saleButton}>
            <Text style={styles.saleText}>For Sale</Text>
          </Pressable>
          <Pressable style={styles.likeButton}>
            <Icon name='heart-outline' size={20} color={'white'} />
          </Pressable>
        </View>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <Text style={styles.priceText}>${item.price} monthly</Text>
        <Text>{item.address}</Text>
        <View style={styles.infoWrapper}>
          <View style={styles.infoContainer}>
            <Icon name='bed-outline' size={20} color={secondaryColor} />
            <Text style={styles.infoText}>3 Bed</Text>
          </View>
          <View style={styles.infoContainer}>
            <IconMaterial
              name='bathtub-outline'
              size={20}
              color={secondaryColor}
            />
            <Text style={styles.infoText}>2 Bath</Text>
          </View>
          <View style={styles.infoContainer}>
            <Icon name='cube-outline' size={20} color={secondaryColor} />
            <Text style={styles.infoText}>{item.square_footage} Sqr</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default HouseCard;

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderWidth: 2,
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#eaecec',
  },
  image: {
    height: 220,
    resizeMode: 'cover',
    padding: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  saleButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
  saleText: {
    color: mainColor,
    fontWeight: 'bold',
  },
  likeButton: {
    backgroundColor: '#bdc3c7',
    padding: 10,
    borderRadius: 50,
  },
  contentContainer: {
    padding: 8,
    gap: 12,
  },
  priceText: {
    color: mainColor,
    fontWeight: 'bold',
    marginTop: 4,
  },

  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: 'black',
  },
});
