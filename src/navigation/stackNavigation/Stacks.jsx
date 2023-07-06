import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Welcomepage from '../../screens/EntryPoint/Welcomepage';
import StartScreen from '../../screens/EntryPoint/StartScreen';
import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';
import Tabs from '../tabNavigation/Tabs';
import ProductsList from '../../screens/userScreen/products/ProductsList';
import ProductsDetail from '../../screens/userScreen/productDetail/ProductsDetail';
import OrderSuccess from '../../screens/userScreen/orderSuccess/OrderSuccess';
import AdminPage from '../../screens/AdminScreen/AdminPage';
import AdLogin from '../../screens/AdminScreen/AdminAuth/AdLogin';
import AdminProductsList from '../../screens/AdminScreen/products/AdminProductsList';
import AdminAddProduct from '../../screens/AdminScreen/products/AdminAddProduct';

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
        name="OrderSuccess"
        component={OrderSuccess}
        options={{headerShown: false}}
      />
      {/* Admin Section */}
      <Stack.Screen
        name="AdLogin"
        component={AdLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminPage"
        component={AdminPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminProductsList"
        component={AdminProductsList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminAddProduct"
        component={AdminAddProduct}
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
