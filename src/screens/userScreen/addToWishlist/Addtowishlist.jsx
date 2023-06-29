import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Tab, Text, BottomSheet, ListItem} from '@rneui/themed';
import {useSelector, useDispatch} from 'react-redux';
import FormatePrice from '../../../helpers/FormatePrice';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  clearWishList,
  removeWishlist,
} from '../../../redux/features/AddToCart/wishListSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Addtowishlist = () => {
  const [index, setIndex] = React.useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const wishlist = useSelector(state => state.wishList);
  const Navigation = useNavigation();

  const onPress = () => {
    setIsVisible(false);
  };
  const clearWishlist = () => {
    dispatch(clearWishList());
    setIsVisible(false);
  };
  const removeproduct = item => {
    console.log('first', item);
    dispatch(removeWishlist(item));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: '#48b1bf',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => Navigation.navigate('ProductsList')}>
          <AntDesign name="arrowleft" style={{fontSize: 20}} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            padding: 12,
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          WishList
        </Text>
      </View>
      {wishlist?.wishlistItem?.length === 0 ? (
        <View style={styles.emptywishlist}>
          <Text style={{fontSize: 18, color: 'black'}}>
            No Item In The Wishlist
          </Text>
        </View>
      ) : (
        <ScrollView>
          {wishlist?.wishlistItem?.map((item, id) => {
            return (
              <View style={styles.cardflex} key={id}>
                <View>
                  <Image
                    source={{uri: item?.image}}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      margin: 10,
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: item?.color,
                      color: 'transparent',
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                      position: 'absolute',
                      bottom: 10,
                      right: 5,
                      borderColor: 'white',
                      borderWidth: 2,
                    }}></View>
                </View>
                <View>
                  <Text style={{textAlign: 'center'}}>{item?.name}</Text>
                  <Text style={{textAlign: 'center'}}>
                    {<FormatePrice price={item?.price} />}
                  </Text>
                </View>
                <View>
                  <Text style={{}}>{item?.company}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{marginRight: 15}}>
                    <AntDesign
                      name="delete"
                      style={{fontSize: 25}}
                      color="red"
                      onPress={() => removeproduct(item?.id)}
                    />
                  </Text>
                  <Text style={{}}>
                    <Entypo
                      name="dots-three-vertical"
                      size={25}
                      onPress={() => setIsVisible(true)}
                    />
                  </Text>
                </View>
              </View>
            );
          })}

          {/* bottom section */}
          <SafeAreaProvider>
            <BottomSheet isVisible={isVisible}>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title
                    style={{paddingTop: 20, fontSize: 17, color: 'black'}}
                    onPress={() => clearWishlist()}>
                    <AntDesign
                      name="delete"
                      style={{fontSize: 18, marginTop: 10}}
                      color="red"
                    />
                    Clear Wishlist
                  </ListItem.Title>
                  <ListItem.Title
                    style={{paddingTop: 20, color: 'black', fontSize: 18}}
                    onPress={() => Navigation.navigate('ProductsList')}>
                    <AntDesign
                      name="arrowleft"
                      style={{fontSize: 18}}
                      color="black"
                    />
                    Continue Shopping
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem.Title
                style={{
                  backgroundColor: 'red',
                  padding: 15,
                  margin: 0,
                  width: '100%',
                  color: 'white',
                  fontSize: 20,
                }}
                onPress={onPress}>
                Cancel
              </ListItem.Title>
            </BottomSheet>
          </SafeAreaProvider>
        </ScrollView>
      )}
    </View>
  );
};
export default Addtowishlist;

const styles = StyleSheet.create({
  cardflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    margin: 5,
  },
  button: {
    margin: 10,
  },
  emptywishlist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// uri: i?.image?.[0]?.url ? i?.image[0].url.trim() : null,
