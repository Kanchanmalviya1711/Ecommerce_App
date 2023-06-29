import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Welcomepage from '../../screens/EntryPoint/Welcomepage';
import StartScreen from '../../screens/EntryPoint/StartScreen';
import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';
import Tabs from '../tabNavigation/Tabs';

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator initialRouteName="Welcomepage">
      <Stack.Screen
        name="Welcomepage"
        component={Welcomepage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
