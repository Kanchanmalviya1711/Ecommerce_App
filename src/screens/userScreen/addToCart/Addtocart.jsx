import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  IncreaseCart,
  clearCart,
  decreaseCart,
  getTotal,
  remove,
} from '../../../redux/features/AddToCart/cartSlice';
import {useNavigation} from '@react-navigation/native';
import FormatePrice from '../../../helpers/FormatePrice';
import {PaperProvider} from 'react-native-paper';
import CartHeader from '../../../components/CartHeader';
import {Overlay} from '@rneui/themed';

const Addtocart = ({route}) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const cart = useSelector(state => state.addCart.cartItem);
  // console.log(cart.totalAmount, 'add to cart ');

  const grandTotal = useSelector(state => state.addCart.totalAmount);

  const removeproduct = item => {
    dispatch(remove(item));
  };

  const decreaseCartIcon = item => {
    dispatch(decreaseCart(item));
  };
  const addToCarticon = item => {
    dispatch(IncreaseCart(item));
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const placedOrder = () => {
    setVisible(!visible);
    Navigation.navigate('OrderSuccess');
    dispatch(clearCart());
  };
  return (
    <PaperProvider>
      <CartHeader />
      <View style={styles.container}>
        {cart?.length > 0 ? (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View style={styles.containerView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '20%',
                    }}>
                    <Image
                      source={{uri: item?.image}}
                      style={{width: 50, height: 50, resizeMode: 'stretch'}}
                    />
                    <Text
                      style={{
                        backgroundColor: item?.color,
                        color: 'transparent',
                        width: 20,
                        height: 20,
                        marginLeft: 5,
                        borderRadius: 10,
                      }}>
                      {item?.color}
                    </Text>
                  </View>
                  <View style={{width: '25%'}}>
                    <Text style={styles.itemText}>{item?.name}</Text>
                    <Text style={styles.itemText}>
                      {<FormatePrice price={item?.price} />}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '25%',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      padding: 2,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <View>
                      <TouchableOpacity onPress={() => decreaseCartIcon(item)}>
                        <Icon name="minussquare" size={30} color="#990000" />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 5,
                        marginRight: 5,
                        color: 'black',
                      }}>
                      {item?.cartQuantity}
                    </Text>

                    <View>
                      <TouchableOpacity onPress={() => addToCarticon(item)}>
                        <Icon name="plussquare" size={30} color="#66CDAA" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{width: '25%'}}>
                    <Text style={styles.itemText}>
                      {
                        <FormatePrice
                          price={item?.price * item?.cartQuantity}
                        />
                      }
                    </Text>
                  </View>
                  <View style={{width: '20%'}}>
                    <TouchableOpacity>
                      <Text>
                        <Icon
                          name="delete"
                          style={styles.iconStyle}
                          onPress={() => removeproduct(item?.id)}
                        />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <View>
              <View style={styles.pricedetail}>
                <View
                  style={{
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 17, color: 'black'}}>Total Item</Text>
                  <Text style={{fontSize: 17, color: 'green'}}>
                    {cart?.length}
                  </Text>
                </View>

                <View
                  style={{
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <Text style={{fontSize: 17, color: 'black'}}>Shipping</Text>
                  <Text style={{fontSize: 17, color: 'green'}}>Free</Text>
                </View>
                <View
                  style={{
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
                    Grand Total
                  </Text>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    {<FormatePrice price={grandTotal} />} {}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setVisible(true)}
                  style={{
                    backgroundColor: '#ED8F03',
                    margin: 5,
                    padding: 10,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Place Order
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* USER PROFILE MODAL/OVERLAY*/}
            <Overlay
              style={{height: '100%', padding: 10}}
              isVisible={visible}
              onBackdropPress={toggleOverlay}>
              <Text style={{fontSize: 18, color: 'black', padding: 10}}>
                Do You Want To Place This Order
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  onPress={toggleOverlay}
                  style={{
                    fontSize: 18,
                    color: 'white',
                    margin: 5,
                    backgroundColor: '#ff6347',
                    padding: 10,
                    textAlign: 'center',
                    borderRadius: 5,
                  }}>
                  Cancel
                </Text>
                <Text
                  onPress={placedOrder}
                  style={{
                    fontSize: 18,
                    color: 'white',
                    margin: 5,
                    backgroundColor: '#ED8F03',
                    padding: 10,
                    textAlign: 'center',
                    borderRadius: 5,
                  }}>
                  Proceed To Checkout
                </Text>
              </View>
            </Overlay>
          </>
        ) : (
          <View style={styles.emptyCart}>
            <Text style={{fontSize: 18, color: 'black'}}>
              Your cart is empty
            </Text>
          </View>
        )}
      </View>
    </PaperProvider>
  );
};

export default Addtocart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  containerView: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  itemText: {
    color: 'black',
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconStyle: {
    fontSize: 25,
    color: 'red',
  },
});
