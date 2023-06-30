import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/userScreen/HomeScreen/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet} from 'react-native';
import Addtocart from '../../screens/userScreen/addToCart/Addtocart';
import Addtowishlist from '../../screens/userScreen/addToWishlist/Addtowishlist';
import UserProfile from '../../screens/userScreen/userProfile/UserProfile';

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
                  color={focused ? '#48b1bf' : '#ffffff'}
                />
              </View>
            );
          },
          headerShown: false,
          showLabel: false,
        }}
      />
      <Tab.Screen
        name="Addtocart"
        component={Addtocart}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <FontAwesome
                  name="cart-plus"
                  size={25}
                  color={focused ? '#48b1bf' : '#ffffff'}
                />
              </View>
            );
          },
          headerShown: false,
          showLabel: false,
        }}
      />
      <Tab.Screen
        name="Addtowishlist"
        component={Addtowishlist}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Ionicons
                  name="heart"
                  size={25}
                  color={focused ? '#48b1bf' : '#ffffff'}
                />
              </View>
            );
          },
          headerShown: false,
          showLabel: false,
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <FontAwesome
                  name="user-circle-o"
                  size={25}
                  color={focused ? '#48b1bf' : '#ffffff'}
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
