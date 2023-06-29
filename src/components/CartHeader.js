import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Modal, StyleSheet} from 'react-native';
import {Divider} from '@rneui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import {clearCart} from '../redux/features/AddToCart/cartSlice';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CartHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const ClearItem = () => {
    dispatch(clearCart());
    setModalVisible(false);
  };
  const cart = useSelector(state => state?.cart?.cartItem);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginLeft: 10}}
        onPress={() => Navigation.navigate('ProductsList')}>
        <AntDesign name="arrowleft" style={{fontSize: 23}} color="white" />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            margin: 10,
          }}>
          Cart Details
        </Text>
      </View>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.openButtonText}>
          <Entypo name="dots-three-vertical" size={20} color={'white'} />
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {cart?.length > 0 ? (
              <TouchableOpacity onPress={ClearItem}>
                <Text style={{margin: 5}}>Clear Cart</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{margin: 5}}>Cart Empty</Text>
            )}
            <Divider />
            <TouchableOpacity
              onPress={() => Navigation.navigate('ProductsList')}>
              <Text style={{margin: 5}}>Continue Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    opacity: 0.7,
    backgroundColor: 'black',
  },
  openButtonText: {
    margin: 10,
    fontSize: 18,
    color: '#007AFF',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    backgroundColor: 'red',
    fontSize: 16,
    padding: 5,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
    borderRadius: 6,
  },
});

export default CartHeader;
