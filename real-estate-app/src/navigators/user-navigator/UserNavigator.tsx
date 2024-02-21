import { StyleSheet } from 'react-native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import UserTabBar from './UserTabBar';

import Home from 'src/views/home/Home';
import HouseDetails from 'src/views/house/HouseDetails';
import Direct from 'src/views/direct/Direct';
import Chat from 'src/views/chat/Chat';
import ChatList from 'src/views/chat/ChatList';
import MortgageDetailsScreen from 'src/views/mortgage/MortgageDetails';

const Stack = createStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='TabBar'>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen
        name='TabBar'
        component={UserTabBar}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='HouseDetails'
        component={HouseDetails}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='Direct'
        component={Direct}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='Chat'
        component={Chat}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='ChatList'
        component={ChatList}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='MortgageDetails'
        component={MortgageDetailsScreen}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;

const styles = StyleSheet.create({});
