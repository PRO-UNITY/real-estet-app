import React from 'react';
import { StyleSheet, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Home from 'src/views/home/Home';

import { mainColor } from '@utils';
import { HeaderTitle } from '@components';

import LikedHouses from 'src/views/liked/LikedHouses';

const Tab = createBottomTabNavigator();

const headersTitleIcons = [
  { name: 'person', color: '#000', size: 25, screen: 'ChatList' },
  {
    name: 'notifications-outline',
    color: '#000',
    size: 25,
    screen: 'ChatList',
  },
];

const TabBar = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { display: 'none' },
      }}
    >
      <Tab.Screen
        options={{
          headerTintColor: mainColor,
          tabBarActiveTintColor: mainColor,
          tabBarLabel: '',
          tabBarIcon: ({ size }: any) => (
            <Icon name='home' color={mainColor} size={size} />
          ),
          headerTitle: () => (
            <View style={styles.header}>
              <HeaderTitle icons={headersTitleIcons} navigation={navigation} />
            </View>
          ),
        }}
        name='Home'
        component={Home}
      />
      <Tab.Screen
        options={{
          headerTintColor: mainColor,
          tabBarActiveTintColor: mainColor,
          tabBarLabel: '',
          tabBarIcon: ({ size }: any) => (
            <Icon name='heart' color={mainColor} size={size} />
          ),
          headerTitle: () => (
            <View style={styles.header}>
              <HeaderTitle icons={headersTitleIcons} navigation={navigation} />
            </View>
          ),
        }}
        name='likedHouses'
        component={LikedHouses}
      />
    </Tab.Navigator>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
});
