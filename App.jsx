import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';

import Welcomepage from './src/screens/EntryPoint/Welcomepage';
import Header from './src/components/Header';
import ProductsList from './src/screens/userScreen/products/ProductsList';
import ProductsDetail from './src/screens/userScreen/productDetail/ProductsDetail';
import Addtocart from './src/screens/userScreen/addToCart/Addtocart';
import Addtowishlist from './src/screens/userScreen/addToWishlist/Addtowishlist';
import StartScreen from './src/screens/EntryPoint/StartScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Header />
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
          name="ProductsList"
          component={ProductsList}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ProductDetail"
          component={ProductsDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Addtocart"
          component={Addtocart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Addtowishlist"
          component={Addtowishlist}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

// project name decleare in the string.xml file ex- Ecommerce app
