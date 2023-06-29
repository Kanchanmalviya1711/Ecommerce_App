import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/userScreen/HomeScreen/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: 'black',
          elevation: 2,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Ionicons
                  name="home"
                  size={21}
                  color={focused ? '#A770EF' : '#ffffff'}
                />
              </View>
            );
          },
          headerShown: false,
          showLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
