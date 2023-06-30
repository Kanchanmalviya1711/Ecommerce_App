import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const OrderSuccess = () => {
  const Navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View>
        <Image
          source={require('../../../../assets/img/order1.png')}
          style={{margin: 20, width: 230, height: 230}}
        />
      </View>
      <View>
        <Text style={styles.heading}>Order Success</Text>
      </View>

      <View>
        <Text style={styles.placedOrder}>Order Placed Successfully</Text>
      </View>
      <View>
        <Text style={styles.orderpara}>
          Your order has been placed and will be delivered within - 7 working
          days.
        </Text>
      </View>
      <View>
        <LinearGradient
          colors={['#22c1c3', '#fdbb2d']}
          style={{marginTop: 10, borderRadius: 5}}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <TouchableOpacity
            style={styles.btntextContinue}
            onPress={() => Navigation.navigate('HomeScreen')}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
              <Ionicons name="ios-arrow-undo-outline" size={20} /> Back To Home
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '##ff7f50',
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: '#ffd194',
    fontSize: 40,
    fontWeight: 'bold',
  },
  placedOrder: {
    fontSize: 25,
    margin: 20,
    color: '#20e3b2',
  },
  orderpara: {
    fontSize: 20,
    margin: 20,
    color: 'gray',
  },
  btntextContinue: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
export default OrderSuccess;
