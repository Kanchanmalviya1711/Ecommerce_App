import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const {height} = Dimensions.get('window');

const AdminPage = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <View
        style={{
          backgroundColor: 'red',
          height: height / 3,
          justifyContent: 'center',
        }}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          optio explicabo necessitatibus adipisci magni quo officia nihil
          voluptatum cum similique?
        </Text>
      </View>
    </View>
  );
};

export default AdminPage;
