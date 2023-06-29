import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {detailApi} from '../../../redux/features/ProductDetails/detailsSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormatePrice from '../../../helpers/FormatePrice';
import {addtoWishList} from '../../../redux/features/AddToCart/wishListSlice';
import {addToCart} from '../../../redux/features/AddToCart/cartSlice';

const ProductsDetail = ({route}) => {
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const singleProduct = useSelector(state => state.productDetail);
  console.log(singleProduct, 'prodetails');

  const {id} = route.params || {};
  console.log(id);
  useEffect(() => {
    dispatch(detailApi(id));
  }, [dispatch, id]);

  const {colors, image, name, company, rating, description, price} =
    singleProduct?.product || {};

  const [color, setColor] = useState(colors?.[0]);

  // product add to cart
  const addCart = (product, color) => {
    if (color) {
      console.log(product, 'product');
      dispatch(addToCart({product, color}));
      Navigation.navigate('Addtocart', {id: id, color: color});
      ToastAndroid.showWithGravity(
        'Item added to the cart',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.showWithGravity(
        'Please select the color',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  // product add to wishlist
  const addToWishlist = (product, color) => {
    dispatch(addtoWishList({product, color}));
    Navigation.navigate('Addtowishlist', {id: id});
    ToastAndroid.showWithGravity(
      'Item added to the wishlist',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  // start rating of the product
  const renderRatingStars = stars => {
    const ratingStars = Array.from({length: 5}, (elem, index) => {
      const number = index + 0.5;
      return (
        <View key={index}>
          {stars >= index + 1 ? (
            <MaterialIcons name="star" style={styles.iconStyle} />
          ) : stars >= number ? (
            <MaterialIcons name="star-half" style={styles.iconStyle} />
          ) : (
            <MaterialIcons name="star-outline" style={styles.iconStyle} />
          )}
        </View>
      );
    });

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {ratingStars}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            margin: 10,
            backgroundColor: 'white',
            borderRadius: 5,
            elevation: 6,
            paddingBottom: 5,
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image
              source={{uri: image}}
              resizeMode="cover"
              style={{
                width: 250,
                height: 250,
                resizeMode: 'stretch',
              }}
            />
          </View>
          <View>
            <Text style={styles.heading}>{company}</Text>
            <Text style={styles.heading}> Product -{name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <View style={styles.pricestockStyle}>
              <Text style={{color: '#5f9ea0', fontSize: 20}}>
                <FormatePrice price={price} /> /-
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              {renderRatingStars(rating)}
            </View>
          </View>
          <View style={{justifyContent: 'space-evenly'}}>
            <Text style={{fontSize: 17, margin: 10, color: 'black'}}>
              Description
            </Text>
            <Text
              style={{
                alignSelf: 'auto',
                margin: 10,
                fontSize: 16,
                lineHeight: 20,
                color: 'black',
              }}>
              {description}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginHorizontal: 10,
            }}>
            <Text style={{fontSize: 20, marginTop: 10, color: 'black'}}>
              Select Color :
            </Text>
            {colors?.map((clr, id) => (
              <View style={{}} key={id}>
                <TouchableOpacity key={id} onPress={() => setColor(clr)}>
                  <Text
                    style={[
                      styles.colorStyle,
                      {
                        backgroundColor: clr?.trim(),
                        textAlign: 'center',
                        padding: 5,
                      },
                    ]}>
                    {color === clr ? (
                      <Icon name="check" color="white" size={18} />
                    ) : null}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View>
            <TouchableOpacity onPress={() => addCart(singleProduct, color)}>
              <Text style={styles.addToCart}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => addToWishlist(singleProduct, color)}>
              <Text style={styles.wishList}>WishList</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductsDetail;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconStyle: {
    fontSize: 28,
    margin: 5,
    color: 'orange',
  },
  pricestockStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  colorStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    marginTop: 10,
  },
  addToCart: {
    backgroundColor: '#9acd32',
    padding: 10,
    margin: 10,
    color: 'white',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  wishList: {
    backgroundColor: '#ffd700',
    padding: 10,
    margin: 10,
    color: 'white',
    borderRadius: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
});
