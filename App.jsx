import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Header from './src/components/Header';
import Stacks from './src/navigation/stackNavigation/Stacks';

const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <Stacks />
    </NavigationContainer>
  );
};

export default App;

// project name decleare in the string.xml file ex- Ecommerce app
