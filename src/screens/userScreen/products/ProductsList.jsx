import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {testapi} from '../../../redux/features/allProductsSlice';
import uuid from 'react-native-uuid';
import FormatePrice from '../../../helpers/FormatePrice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductsList = () => {
  const [search, setSearch] = useState('');
  const Navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchProducts = useSelector(
    state => state.allProducts.products.products,
  );
  const productCount = useSelector(
    state => state.allProducts.products.productsCount,
  );
  console.log(productCount, 'fetch product count');

  useEffect(() => {
    let url = 'products';
    dispatch(testapi(url));
    const unsubscribe = Navigation.addListener('focus', () => {
      dispatch(testapi(url));
    });
    return () => {
      unsubscribe;
    };
  }, [Navigation]);

  const fetchItem = fetchProducts?.filter(e =>
    e?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  //product details
  function productDetails(id) {
    console.log(id, 'iddd');
    Navigation.navigate('ProductDetail', {id: id});
  }

  const renderRatingStars = stars => {
    const ratingStar = Array.from({length: 5}, (elem, index) => {
      let number = index + 0.5;

      return (
        <View key={index}>
          {stars >= index + 1 ? (
            <Icon name="star" style={styles.iconStyle} />
          ) : stars >= number ? (
            <Icon name="star-half" style={styles.iconStyle} />
          ) : (
            <Icon name="star-outline" style={styles.iconStyle} />
          )}
        </View>
      );
    });

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {ratingStar}
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.searbar}>
        <TextInput
          placeholder="Search Product"
          value={search}
          onChangeText={text => setSearch(text)}
          placeholderTextColor={'white'}
          style={{fontSize: 16, color: 'white', padding: 10}}
        />
      </View>
      <View>
        <Text style={{color: 'black', marginHorizontal: 10, fontSize: 18}}>
          Total Products : {productCount}
        </Text>
      </View>
      <FlatList
        data={fetchItem}
        numColumns={2}
        refreshing={false}
        keyExtractor={() => uuid.v4()}
        renderItem={({item}) => {
          return (
            <View style={styles.productImageContent}>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{}}>
                  <TouchableOpacity onPress={() => productDetails(item?._id)}>
                    <Image
                      source={{uri: item?.image}}
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'stretch',
                        margin: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      marginTop: 5,
                    }}>
                    {item?.name}
                  </Text>
                  <Text style={{textAlign: 'center'}}>{item?.company}</Text>
                  <Text
                    style={{
                      color: '#5f9ea0',
                      margin: 10,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 12,
                    }}>
                    {<FormatePrice price={item?.price} />}
                  </Text>

                  <View style={{alignItems: 'center'}}>
                    {renderRatingStars(item?.rating)}
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  aa: {
    backgroundColor: 'white',
  },
  iconStyle: {
    fontSize: 18,
    color: '#dfb726d1',
  },
  productImageContent: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 6,
    paddingBottom: 5,
  },
  searbar: {
    margin: 10,
    backgroundColor: '#48b1bf',
    borderRadius: 5,
    elevation: 6,
    paddingBottom: 5,
  },
});
